"use client";

import { useId, useRef, useState, type FormEvent, type RefObject } from "react";

const FIELD_ORDER = ["contact", "phone", "reward"] as const;

type FieldName = (typeof FIELD_ORDER)[number];

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: FormValues = { contact: "", phone: "", reward: "" };

const FIELD_LABELS: Record<FieldName, string> = {
  contact: "Контактное лицо",
  phone: "Телефон для связи",
  reward: "Вознаграждение за наводку",
};

const FIELD_PLACEHOLDERS: Record<FieldName, string> = {
  contact: "Имя и фамилия",
  phone: "+7 900 000-00-00",
  reward: "Например: обсуждаемо после сверки",
};

const FIELD_HINTS: Record<FieldName, string> = {
  contact: "Как к вам обращаться в разговоре по делу.",
  phone: "Только для звонка по этому запросу, третьим лицам не передаём.",
  reward: "Ваше ожидание: сумма, доля или «обсуждаемо».",
};

function validateField(name: FieldName, rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (name === "contact") {
    if (value.length === 0) return "Укажите контактное лицо.";
    if (value.length < 2) return "Слишком коротко: минимум 2 символа.";
    return undefined;
  }

  if (name === "phone") {
    if (value.length === 0) return "Без телефона мы не сможем связаться.";
    if (!/^[+\d][\d\s()-]*$/.test(value)) {
      return "Допустимы цифры, пробелы, «+», скобки и дефисы.";
    }
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) return "Нужно минимум 10 цифр, например +7 900 000-00-00.";
    if (digits.length > 15) return "Слишком много цифр для телефонного номера.";
    return undefined;
  }

  if (value.length === 0) return "Опишите ожидание по вознаграждению.";
  if (value.length < 3) return "Слишком коротко: минимум 3 символа.";
  if (value.length > 200) return "Слишком длинно: до 200 символов.";

  return undefined;
}

export default function RequestForm() {
  const uid = useId();
  const contactRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const rewardRef = useRef<HTMLInputElement>(null);

  const refs: Record<FieldName, RefObject<HTMLInputElement | null>> = {
    contact: contactRef,
    phone: phoneRef,
    reward: rewardRef,
  };

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleChange(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleBlur(name: FieldName) {
    if (values[name].trim().length === 0) return;

    const message = validateField(name, values[name]);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    for (const name of FIELD_ORDER) {
      const message = validateField(name, values[name]);
      if (message) nextErrors[name] = message;
    }

    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      setSent(false);
      refs[firstInvalid].current?.focus();
      return;
    }

    setSent(true);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSent(false);
    // Форма монтируется заново, поэтому фокус ставим после обновления состояния.
    setTimeout(() => contactRef.current?.focus(), 0);
  }

  if (sent) {
    return (
      <div className="sent" role="status">
        <div className="note note--ok">
          <strong>Проверка пройдена.</strong> Запрос не уходит на сервер: в этом уроке страница
          ещё не связана с API-роутом, базы пока нет. Значения остались в браузере.
        </div>

        <dl className="sent__list">
          {FIELD_ORDER.map((name) => (
            <div className="sent__row" key={name}>
              <dt className="sent__key">{FIELD_LABELS[name]}</dt>
              <dd className="sent__value">{values[name].trim()}</dd>
            </div>
          ))}
        </dl>

        <div className="form__actions">
          <button type="button" className="button" onClick={() => setSent(false)}>
            Изменить данные
          </button>
          <button type="button" className="button button--ghost" onClick={handleReset}>
            Оставить другой запрос
          </button>
        </div>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((name) => errors[name]);

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {errorList.length > 0 ? (
        <div className="form__summary" role="alert">
          <p className="form__summary-title">Проверьте поля формы:</p>
          <ul>
            {errorList.map((name) => (
              <li key={name}>
                {FIELD_LABELS[name]} — {errors[name]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form__row">
        {FIELD_ORDER.map((name) => {
          const error = errors[name];
          const inputId = `${uid}-${name}`;
          const hintId = `${inputId}-hint`;
          const errorId = `${inputId}-error`;

          return (
            <div className="field" key={name}>
              <label className="field__label" htmlFor={inputId}>
                {FIELD_LABELS[name]}
                <span className="field__required" aria-hidden="true">
                  *
                </span>
              </label>

              <input
                id={inputId}
                ref={refs[name]}
                className="input"
                name={name}
                type={name === "phone" ? "tel" : "text"}
                inputMode={name === "phone" ? "tel" : undefined}
                autoComplete={name === "contact" ? "name" : name === "phone" ? "tel" : "off"}
                placeholder={FIELD_PLACEHOLDERS[name]}
                value={values[name]}
                onChange={(event) => handleChange(name, event.target.value)}
                onBlur={() => handleBlur(name)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
                required
              />

              <p className="field__hint" id={hintId}>
                {FIELD_HINTS[name]}
              </p>

              {error ? (
                <p className="field__error" id={errorId} role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="form__actions">
        <button type="submit" className="button">
          Отправить первичный запрос
        </button>
        <span className="field__hint">Все три поля обязательны.</span>
      </div>

      <p className="form__legal">
        Телефон используем только для разговора по этому запросу. Имена и материалы дела
        не публикуем.
      </p>
    </form>
  );
}
