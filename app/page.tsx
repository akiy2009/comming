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
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
            スムーズな受付を、
            <br />
            <span className="text-indigo-600">もっと直感的に</span>
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
            QRコードで受付をシンプルに。
            待ち時間を減らし、イベント体験をより快適にします。
          </p>

          <div className="flex gap-4">
            <Link href="/register">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-base font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                事前登録する
              </button>
            </Link>

            <a href="#info">
              <button className="border border-gray-300 px-6 py-3 rounded-2xl text-base font-medium hover:bg-gray-100 transition">
                詳細
              </button>
            </a>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-gray-200/60 p-8">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <span>CHECK-IN</span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-md">READY</span>
          </div>

          <div className="h-44 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-sm">
            QR CODE
          </div>

          <div className="mt-6 text-sm text-gray-500">USER ID: #A12345</div>
        </div>
      </section>

      {/* Info */}
      <section id="info" className="max-w-6xl mx-auto px-6 py-20">
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

      {/* Steps */}
      <section className="bg-white/60 border-y border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-xl font-semibold mb-10 tracking-tight">受付の流れ</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "事前登録",
              "QRコード取得",
              "当日提示",
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="text-gray-600 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-10">
        © Event Reception System
      </footer>

    </main>
  );
}
