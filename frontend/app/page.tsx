"use client";

import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12">

        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Interview Prep
          </h1>

          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all">
                  Đăng nhập
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <Link
                  href="/product"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
                >
                  Vào ứng dụng
                </Link>
                <UserButton showName />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-16">
          <div className="mb-6 text-6xl">🎯</div>

          <h2 className="text-6xl font-bold leading-[1.1] pb-2
            bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600
            bg-clip-text text-transparent mb-6">
            Chinh phục <br /> Phỏng vấn AI/ML
          </h2>


          <p className="text-xl text-blue-900 dark:text-blue-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nền tảng AI giúp bạn chuẩn bị phỏng vấn chuyên nghiệp cho các vị trí
            Machine Learning Engineer, Data Scientist, AI Researcher với câu hỏi
            thực tế và lộ trình học tập cá nhân hóa.
          </p>

          {/* Features */}
          <div className="features-grid grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                icon: "💡",
                title: "Câu hỏi Phỏng vấn Thực tế",
                desc: "8–10 câu hỏi technical + behavioral theo role & level",
                gradient: "from-purple-600 to-pink-600",
              },
              {
                icon: "⭐",
                title: "Framework STAR",
                desc: "Gợi ý trả lời theo STAR từ kinh nghiệm của bạn",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                icon: "🚀",
                title: "Lộ trình Cá nhân hóa",
                desc: "Timeline 2–4 tuần với tài liệu & mục tiêu rõ ràng",
                gradient: "from-emerald-600 to-green-600",
              },
            ].map((item) => (
              <div key={item.title} className="feature-card-wrapper relative group">
                <div
                  className={`feature-card-glow absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur opacity-25 group-hover:opacity-40 transition`}
                />
                <div className="feature-card-content relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 min-h-[3.5rem]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition transform hover:scale-105 shadow-lg">
                🚀 Bắt đầu miễn phí
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition transform hover:scale-105 shadow-lg">
                🎯 Chuẩn bị phỏng vấn ngay
              </button>
            </Link>
          </SignedIn>
        </section>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ✅ Trusted by AI Engineers
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              🔒 Secure & Private
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              🎓 Expert-backed
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}