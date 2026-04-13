"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-800">

      {/* ヘッダー */}
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">イベント受付</h1>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            スムーズな受付を、
            <br />
            もっと簡単に
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            事前登録を行うことで、当日の受付をスムーズに行えます。
            QRコードでスマートにチェックインしましょう。
          </p>

          <Link href="/register">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              事前登録する →
            </button>
          </Link>
        </motion.div>

        {/* ビジュアルカード */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 border"
        >
          <div className="space-y-4">
            <div className="h-4 bg-indigo-100 rounded" />
            <div className="h-4 bg-indigo-200 rounded w-3/4" />
            <div className="h-4 bg-indigo-100 rounded w-1/2" />
            <div className="mt-6 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              QRコードイメージ
            </div>
          </div>
        </motion.div>
      </section>

      {/* 開催情報 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold mb-8">開催情報</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {["開催日", "会場", "参加費"].map((label, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md border hover:shadow-lg transition"
            >
              <div className="text-sm text-gray-500 mb-2">{label}</div>
              <div className="text-lg font-semibold">
                {label === "開催日"
                  ? "2026年◯月◯日"
                  : label === "会場"
                  ? "◯◯会場"
                  : "無料"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 受付の流れ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-10">受付の流れ</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "事前登録を行う",
              "QRコードを取得",
              "当日提示する",
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4">注意事項</h3>
          <ul className="space-y-2 text-gray-700">
            <li>QRコードは事前に保存してください。</li>
            <li>提示できない場合、受付に時間がかかる可能性があります。</li>
          </ul>
        </div>
      </section>

      {/* フッター */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © Event Reception System
      </footer>

    </main>
  );
}
