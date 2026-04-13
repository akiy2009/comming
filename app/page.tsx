"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-800 selection:bg-indigo-200">

      {/* ヘッダー */}
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">イベント受付</h1>
          <Link href="/register">
            <button className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow">
              登録
            </button>
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            スムーズな受付を、
            <br />
            <span className="text-indigo-600">もっとスマートに</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            事前登録で受付の待ち時間をゼロへ。
            QRコードを使ったスピーディーなチェックインを実現します。
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="/register">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                事前登録する →
              </button>
            </Link>

            <a href="#info">
              <button className="border border-gray-300 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition">
                詳細を見る
              </button>
            </a>
          </div>
        </motion.div>

        {/* ビジュアルカード */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-transparent opacity-40" />

          <div className="relative space-y-4">
            <div className="h-4 bg-indigo-200 rounded" />
            <div className="h-4 bg-indigo-300 rounded w-3/4" />
            <div className="h-4 bg-indigo-200 rounded w-1/2" />
            <div className="mt-6 h-44 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-medium">
              QRコード表示エリア
            </div>
          </div>
        </motion.div>
      </section>

      {/* 開催情報 */}
      <section id="info" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-10">開催情報</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "開催日", value: "2026年◯月◯日" },
            { label: "会場", value: "◯◯会場" },
            { label: "参加費", value: "無料" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="text-sm text-gray-500 mb-2">{item.label}</div>
              <div className="text-xl font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 受付の流れ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12">受付の流れ</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "事前登録を行う",
              "QRコードを取得",
              "当日提示する",
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow group-hover:scale-110 transition">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-10 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">注意事項</h3>
          <ul className="space-y-3 text-gray-700">
            <li>QRコードは事前に保存してください。</li>
            <li>提示できない場合、受付に時間がかかる可能性があります。</li>
          </ul>
        </div>
      </section>

      {/* フッター */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t">
        © Event Reception System
      </footer>

    </main>
  );
}
