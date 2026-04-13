"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-800 antialiased">

      {/* Header */}
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b border-gray-200/60 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">QR</div>
            <h1 className="text-base font-semibold tracking-tight">Event Check-in</h1>
          </div>

          <Link href="/register">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition">
              登録
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-indigo-600 text-sm font-medium mb-3">イベント受付システム</p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
            QRで、
            <br />
            <span className="text-indigo-600">迷わず受付</span>
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
            事前登録 → QR発行 → 当日提示。
            シンプルな3ステップでスムーズに受付できます。
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="/register">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-base font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                無料で登録する
              </button>
            </Link>

            <a href="#flow">
              <button className="border border-gray-300 px-6 py-3 rounded-2xl text-base font-medium hover:bg-gray-100 transition">
                使い方を見る
              </button>
            </a>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-gray-200/60 p-8">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <span>CHECK-IN STATUS</span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-md">READY</span>
          </div>

          <div className="h-44 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-sm">
            QR CODE
          </div>

          <div className="mt-6 text-sm text-gray-500">USER ID: #A12345</div>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="bg-white/60 border-y border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-xl font-semibold mb-12 tracking-tight">使い方（3ステップ）</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "事前登録",
                desc: "フォームに必要事項を入力",
                icon: "📝",
              },
              {
                title: "QRコード取得",
                desc: "登録完了後に自動発行",
                icon: "📱",
              },
              {
                title: "当日提示",
                desc: "受付でQRを見せるだけ",
                icon: "🎫",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200/60 text-center hover:shadow-md transition">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="font-medium mb-1">{step.title}</p>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-xl font-semibold mb-8 tracking-tight">開催情報</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "開催日", value: "2026年◯月◯日" },
            { label: "会場", value: "◯◯会場" },
            { label: "参加費", value: "無料" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-gray-200/60 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-xs text-gray-400 mb-2">{item.label}</div>
              <div className="text-base font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-indigo-600 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-2">今すぐ受付をスムーズに</h4>
            <p className="text-indigo-100 text-sm">登録は数秒で完了します</p>
          </div>

          <Link href="/register">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-medium hover:bg-gray-100 transition">
              登録する
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-10">
        © 高専カンファレンス無線通信IN大阪実行委員会　イベント管理システム
      </footer>

    </main>
  );
}
