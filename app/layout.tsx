import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Patrick Tunga-Lergo Portfolio",
  description: " portfolio site built with nextjs 13 and tailwindcss",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
