"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    has_license: false,
    license_grade: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          age: Number(form.age),
          has_license: form.has_license,
          license_grade: form.has_license ? form.license_grade : null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "登録エラーが発生しました");
        return;
      }

      const id = result.data?.id;
      if (!id) {
        setError("ID取得に失敗しました");
        return;
      }

      router.push(`/qr/${id}`);
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">参加者登録</h1>
          <p className="text-gray-500 text-sm">1分で完了します</p>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-3xl border border-gray-200/60 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-500 mb-1 block">名前</label>
              <input
                type="text"
                placeholder="山田 太郎"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">年齢</label>
              <input
                type="number"
                placeholder="20"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200/60">
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
              <span className="text-sm text-gray-600">
                アマチュア無線の資格を持っている
              </span>
            </div>

            {form.has_license && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">資格級</label>
                <select
                  value={form.license_grade}
                  onChange={(e) =>
                    setForm({ ...form, license_grade: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="1級">1級</option>
                  <option value="2級">2級</option>
                  <option value="3級">3級</option>
                  <option value="4級">4級</option>
                </select>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-medium shadow-md"
            >
              {loading ? "登録中..." : "登録してQRを発行"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}