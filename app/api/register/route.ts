import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    // 🔐 環境変数チェック
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "サーバー設定エラー" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const name: string = body.name;
    const age: number = Number(body.age);
    const has_license: boolean = Boolean(body.has_license);
    const license_grade: string | null =
      body.license_grade ?? null;

    // ✅ バリデーション
    if (!name || isNaN(age)) {
      return NextResponse.json(
        { error: "名前と年齢は必須です" },
        { status: 400 }
      );
    }

    if (has_license && !license_grade) {
      return NextResponse.json(
        { error: "資格保有者は級を選択してください" },
        { status: 400 }
      );
    }

    // 🔗 Supabaseクライアント（Service Role使用）
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("participants")
      .insert([
        {
          name,
          age,
          has_license,
          license_grade: has_license ? license_grade : null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unexpected Server Error:", err);
    return NextResponse.json(
      { error: "登録処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}