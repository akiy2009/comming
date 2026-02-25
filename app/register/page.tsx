"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    has_license: false,
    license_grade: "",
  });

  const handleSubmit = async () => {
    const payload = {
      ...form,
      license_grade: form.has_license ? form.license_grade : null,
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    window.location.href = `/qr/${data.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">

        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            事前登録
          </h1>
          <p className="text-sm text-gray-500">
            入場用QRコードを発行します
          </p>
        </div>

        {/* 名前 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            名前
          </label>
          <input
            placeholder="山田 太郎"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* 年齢 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            年齢
          </label>
          <input
            type="number"
            placeholder="20"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            onChange={(e) =>
              setForm({ ...form, age: Number(e.target.value) })
            }
          />
        </div>

        {/* 資格有無 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            アマチュア無線資格
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, has_license: true })
              }
              className={`py-3 rounded-xl border text-sm font-medium transition ${
                form.has_license
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              持っている
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  has_license: false,
                  license_grade: "",
                })
              }
              className={`py-3 rounded-xl border text-sm font-medium transition ${
                !form.has_license
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              持っていない
            </button>
          </div>
        </div>

        {/* 級選択 */}
        {form.has_license && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">
              取得級
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["1級", "2級", "3級", "4級"].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, license_grade: grade })
                  }
                  className={`py-3 rounded-xl border text-sm font-semibold transition ${
                    form.license_grade === grade
                      ? "bg-black text-white border-black"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 登録ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-4 rounded-xl text-sm font-semibold tracking-wide hover:opacity-80 active:scale-95 transition transform shadow-md"
        >
          QRコードを発行する
        </button>
      </div>
    </div>
  );
}