"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "next/navigation";

export default function QRPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            受付用QRコード
          </h1>
          <p className="text-gray-500 text-sm">
            当日受付でこの画面を提示してください
          </p>
        </div>

        <div className="flex justify-center">
          <div className="p-6 bg-white rounded-xl shadow-inner border">
            <QRCodeCanvas
              value={id}
              size={220}
              bgColor="#ffffff"
              fgColor="#111827"
              level="H"
              includeMargin
            />
          </div>
        </div>
        <p className="text-gray-500 text-sm">
            受付ID・QRコードを忘れるとQRコードを使用した事前入場ができなくなりますのでご注意ください。
          </p>
        <p className="text-gray-500 text-sm">
          スムーズに受付を行うため、事前にQRコードを保存しておくことをおすすめします。
        </p>
        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 break-all">
          受付ID：{id}
        </div>

        <button
          onClick={() => window.print()}
          className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition transform text-white font-semibold py-3 rounded-lg shadow-md"
        >
          印刷する
        </button>
      </div>
    </div>
  );
}