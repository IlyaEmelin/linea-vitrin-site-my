import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Дело о картине без происхождения — первичный запрос",
  description:
    "Закрытая галерея принимает первичные обращения по делу о картине без происхождения.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
