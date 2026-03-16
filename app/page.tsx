"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-400 text-white">

        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            事前登録受付
          </h1>

          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            当日の受付をスムーズにするため、
            事前登録へのご協力をお願いします。
            登録後にQRコードが発行されます。
          </p>

          <Link href="/register">
            <button className="mt-10 bg-white text-indigo-600 px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition">
              事前登録はこちら
            </button>
          </Link>

        </div>

      </section>

      {/* イベント概要 */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold">イベント概要</h2>
          <p className="text-gray-500 mt-3">
            本イベントの基本情報
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">
              開催日
            </h3>
            <p className="text-gray-600">
              2026年◯月◯日
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">
              開催場所
            </h3>
            <p className="text-gray-600">
              ◯◯会場
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">
              参加費
            </h3>
            <p className="text-gray-600">
              無料
            </p>
          </div>

        </div>

      </section>

      {/* 参加の流れ */}
      <section className="bg-white py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">
              参加の流れ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                事前登録
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                フォームに必要事項を入力します
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                QRコード発行
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                登録後に受付用QRコードが発行されます
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                当日受付
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                QRコードを提示するだけで受付完了
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-indigo-600 text-white">

        <h2 className="text-3xl font-bold">
          事前登録をお願いします
        </h2>

        <p className="mt-4 text-indigo-100">
          スムーズな受付のため、事前登録にご協力ください。
        </p>

        <Link href="/register">
          <button className="mt-8 bg-white text-indigo-600 px-10 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
            登録フォームへ進む
          </button>
        </Link>

      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © Event Registration System
      </footer>

    </main>
  );
}
