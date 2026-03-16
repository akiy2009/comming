"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* ヘッダー */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-wide">
            イベント受付
          </h1>
        </div>
      </header>

      {/* メイン説明 */}
      <section className="max-w-5xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-6">
          事前登録のご案内
        </h2>

        <p className="text-gray-600 leading-relaxed mb-8">
          当日の受付を円滑に行うため、事前登録をお願いしております。
          登録完了後に受付用のQRコードが発行されますので、
          当日はそちらを提示して受付を行ってください。
        </p>

        <Link href="/register">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            事前登録フォームへ
          </button>
        </Link>

      </section>

      {/* 開催情報 */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-5xl mx-auto px-6 py-12">

          <h3 className="text-xl font-semibold mb-6">
            開催情報
          </h3>

          <div className="space-y-4 text-gray-700">

            <div className="flex gap-6">
              <div className="w-28 font-medium">開催日</div>
              <div>2026年◯月◯日</div>
            </div>

            <div className="flex gap-6">
              <div className="w-28 font-medium">会場</div>
              <div>◯◯会場</div>
            </div>

            <div className="flex gap-6">
              <div className="w-28 font-medium">参加費</div>
              <div>無料</div>
            </div>

          </div>

        </div>
      </section>

      {/* 受付の流れ */}
      <section className="max-w-5xl mx-auto px-6 py-12">

        <h3 className="text-xl font-semibold mb-6">
          当日の受付について
        </h3>

        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>事前登録フォームから参加登録を行ってください。</li>
          <li>登録完了後に受付用のQRコードが発行されます。</li>
          <li>当日はQRコードを提示して受付を行ってください。</li>
        </ol>

      </section>

      {/* 注意事項 */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-5xl mx-auto px-6 py-12">

          <h3 className="text-xl font-semibold mb-6">
            注意事項
          </h3>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>登録後に表示されるQRコードは保存しておいてください。</li>
            <li>QRコードを提示できない場合、受付に時間がかかる場合があります。</li>
          </ul>

        </div>
      </section>

      {/* フッター */}
      <footer className="border-t text-center text-sm text-gray-500 py-6">
        © Event Reception System
      </footer>

    </main>
  );
}
