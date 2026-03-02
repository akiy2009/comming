"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Participant = {
  name: string;
  age: number;
  has_license: boolean;
  license_grade: string | null;
};

export default function QRPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/participant/${id}`);
        const result = await res.json();

        if (res.ok) {
          setData(result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

        {loading ? (
          <p className="text-sm text-gray-500">読み込み中...</p>
        ) : data ? (
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-1">
            <p><strong>氏名：</strong>{data.name}</p>
            <p><strong>年齢：</strong>{data.age}歳</p>
            <p>
              <strong>資格：</strong>
              {data.has_license
                ? data.license_grade
                : "なし"}
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-sm">
            情報取得に失敗しました
          </p>
        )}

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
