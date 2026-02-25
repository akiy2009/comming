"use client";

import { useState } from "react";

type FormState = {
  name: string;
  age: string;
  has_license: boolean;
  license_grade: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    age: "",
    has_license: false,
    license_grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError(null);
    setSuccess(false);

    // ✅ フロントバリデーション
    if (!form.name.trim()) {
      setError("名前を入力してください");
      return;
    }

    if (!form.age || isNaN(Number(form.age))) {
      setError("正しい年齢を入力してください");
      return;
    }

    if (form.has_license && !form.license_grade) {
      setError("資格保有者は級を選択してください");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          age: Number(form.age),
          has_license: form.has_license,
          license_grade: form.has_license
            ? form.license_grade
            : null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "登録エラーが発生しました");
        return;
      }

      setSuccess(true);

      // リセット
      setForm({
        name: "",
        age: "",
        has_license: false,
        license_grade: "",
      });
    } catch (err) {
      console.error("Network Error:", err);
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          参加者登録
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="名前"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="年齢"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.has_license}
              onChange={(e) =>
                setForm({
                  ...form,
                  has_license: e.target.checked,
                  license_grade: "",
                })
              }
            />
            資格を持っている
          </label>

          {form.has_license && (
            <select
              value={form.license_grade}
              onChange={(e) =>
                setForm({
                  ...form,
                  license_grade: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">級を選択</option>
              <option value="1級">1級</option>
              <option value="2級">2級</option>
              <option value="3級">3級</option>
              <option value="4級">4級</option>
            </select>
          )}

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm">
              登録が完了しました
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>
      </div>
    </div>
  );
}