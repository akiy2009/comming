"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type Participant = {
  id: string;
  name: string;
  age: number;
  has_license: boolean;
  license_grade: string | null;
  created_at: string;
};

export default function Admin() {
  const [data, setData] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [licenseFilter, setLicenseFilter] = useState<
    "all" | "yes" | "no"
  >("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  // 🇯🇵 JST変換関数
  const formatJST = (utc: string) =>
    new Date(utc).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data } = await supabase
        .from("participants")
        .select("*");

      setData(data || []);
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...data];

    if (search) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (licenseFilter === "yes") {
      result = result.filter((u) => u.has_license);
    }
    if (licenseFilter === "no") {
      result = result.filter((u) => !u.has_license);
    }

    if (gradeFilter !== "all") {
      result = result.filter(
        (u) => u.license_grade === gradeFilter
      );
    }

    if (minAge) {
      result = result.filter((u) => u.age >= Number(minAge));
    }

    if (maxAge) {
      result = result.filter((u) => u.age <= Number(maxAge));
    }

    result.sort((a, b) =>
      sortNewest
        ? new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
    );

    return result;
  }, [
    data,
    search,
    licenseFilter,
    gradeFilter,
    minAge,
    maxAge,
    sortNewest,
  ]);

  const total = data.length;
  const licensed = data.filter((u) => u.has_license).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ヘッダー */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-bold">参加者管理</h1>
          <div className="text-sm text-gray-500">
            表示件数: {filtered.length} / {total}
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white p-4 rounded-xl shadow-sm grid md:grid-cols-6 gap-4">

          <input
            placeholder="名前 or ID検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={licenseFilter}
            onChange={(e) =>
              setLicenseFilter(e.target.value as any)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">資格: 全て</option>
            <option value="yes">資格あり</option>
            <option value="no">資格なし</option>
          </select>

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">級: 全て</option>
            <option value="1級">1級</option>
            <option value="2級">2級</option>
            <option value="3級">3級</option>
            <option value="4級">4級</option>
          </select>

          <input
            type="number"
            placeholder="最少年齢"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="最高年齢"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="border rounded-lg px-3 py-2 hover:bg-gray-50"
          >
            {sortNewest ? "新しい順" : "古い順"}
          </button>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-400">総参加者</div>
            <div className="text-2xl font-semibold">{total}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-sm text-gray-400">資格保有者</div>
            <div className="text-2xl font-semibold">
              {licensed}
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">名前</th>
                <th className="px-4 py-3 text-left">年齢</th>
                <th className="px-4 py-3 text-left">資格</th>
                <th className="px-4 py-3 text-left">級</th>
                <th className="px-4 py-3 text-left">登録日時 (JST)</th>
                <th className="px-4 py-3 text-left">ID</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/qr/${u.id}`}>
                      {u.name}
                    </Link>
                  </td>

                  <td className="px-4 py-3">{u.age}</td>

                  <td className="px-4 py-3">
                    {u.has_license ? "保有" : "なし"}
                  </td>

                  <td className="px-4 py-3">
                    {u.license_grade || "-"}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {formatJST(u.created_at)}
                  </td>

                  <td className="px-4 py-3 text-xs font-mono truncate max-w-[120px]">
                    {u.id}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    該当データなし
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}