import { Protect, PricingTable, UserButton } from "@clerk/nextjs";
import InterviewPrepForm from "./InterviewPrepForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Interview Prep – Chuẩn bị phỏng vấn AI",
  description:
    "Tạo câu hỏi phỏng vấn AI, gợi ý STAR và lộ trình học tập cá nhân hoá",
};

export default function InterviewPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="absolute top-4 right-4">
        <UserButton showName />
      </div>

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Interview Prep
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl mb-8">
            Chuẩn bị phỏng vấn chuyên nghiệp với AI Coach (Bản Miễn Phí)
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <InterviewPrepForm />
        </div>
      </div>
    </main>
  );
}