import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "AI Interview Prep",
  description: "Chuẩn bị phỏng vấn AI/ML chuyên nghiệp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="vi">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}