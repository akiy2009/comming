"use client";

import { useState } from "react";

type FormType = {
  name: string;
  age: number;
  has_license: boolean;
  license_grade: string;
};

export default function Register() {
  const [form, setForm] = useState<FormType>({
    name: "",
    age: 0,
    has_license: false,
    license_grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!form.name.trim()) {
      return setError("名前を入力してください");
    }

    if (form.age <= 0) {
      return setError("正しい年齢を入力してください");
    }

    if (form.has_license && !form.license_grade) {
      return setError("取得級を選択してください");
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        license_grade: form.has_license ? form.license_grade : null,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("登録に失敗しました");
      }

      const data = await res.json();
      window.location.href = `/qr/${data.id}`;
    } catch (err) {
      setError("登録エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6">

        <div className="text-center">
          <h1 className="text-2xl font-bold">事前登録</h1>
          <p className="text-sm text-gray-500">
            入場用QRコードを発行します
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 名前 */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            名前
          </label>
          <input
            className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-black outline-none"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* 年齢 */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            年齢
          </label>
          <input
            type="number"
            className="w-full border rounded-xl p-3 mt-1 focus:ring-2 focus:ring-black outline-none"
            value={form.age === 0 ? "" : form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: Number(e.target.value),
              })
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
                setForm({
                  ...form,
                  has_license: true,
                })
              }
              className={`py-3 rounded-xl border transition ${
                form.has_license
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
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
              className={`py-3 rounded-xl border transition ${
                !form.has_license
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
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
                  className={`py-3 rounded-xl border font-semibold transition ${
                    form.license_grade === grade
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-80 active:scale-95 transition"
        >
          {loading ? "登録中..." : "QRコードを発行する"}
        </button>
      </div>
    </div>
  );
}
