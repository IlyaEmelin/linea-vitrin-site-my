import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/requests — приём первичного запроса по делу о картине.
 *
 * Учебный шаг: тело проверяется одной Zod-схемой, но роут ещё ничего не сохраняет
 * (SQLite нет). Правила полей совпадают с проверками формы, поэтому серверные тексты
 * ошибок можно будет показывать прямо у полей.
 */

const MESSAGE_OBJECT =
  "Ожидается JSON-объект с полями contactPerson, contactPhone, rewardExpectation.";

const requestSchema = z.object({
  contactPerson: z
    .string("Введите контактное лицо: от 2 до 80 символов.")
    .trim()
    .min(2, "Введите контактное лицо: минимум 2 символа.")
    .max(80, "Контактное лицо слишком длинное: до 80 символов."),
  contactPhone: z
    .string("Введите телефон для связи.")
    .trim()
    .min(1, "Введите телефон для связи.")
    .regex(/^[+\d][\d\s()-]*$/, "Допустимы цифры, пробелы, «+», скобки и дефисы.")
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      },
      "Нужно от 10 до 15 цифр, например +7 900 000-00-00.",
    ),
  rewardExpectation: z
    .string("Опишите ожидание по вознаграждению: от 3 до 200 символов.")
    .trim()
    .min(3, "Опишите ожидание по вознаграждению: минимум 3 символа.")
    .max(200, "Ожидание по вознаграждению слишком длинное: до 200 символов."),
});

type RequestField = keyof z.infer<typeof requestSchema>;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Тело запроса не удалось прочитать как JSON." },
      { status: 400 },
    );
  }

  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { ok: false, message: MESSAGE_OBJECT },
      { status: 400 },
    );
  }

  const parsed = requestSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Partial<Record<RequestField, string>> = {};

    // По каждому полю берём первое сообщение: остальные уточняют ту же ошибку.
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && field in requestSchema.shape && !(field in errors)) {
        errors[field as RequestField] = issue.message;
      }
    }

    return NextResponse.json(
      { ok: false, message: "Проверьте поля запроса.", errors },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "API-роут работает",
    received: parsed.data,
  });
}
