import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    // 環境変数チェック
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("ENV ERROR: Supabase keys missing");
      return NextResponse.json(
        { error: "サーバー設定エラー（ENV未設定）" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const name = body.name?.trim();
    const age = Number(body.age);
    const has_license = Boolean(body.has_license);
    const license_grade =
      body.license_grade && body.license_grade !== ""
        ? body.license_grade
        : null;

    // バリデーション
    if (!name) {
      return NextResponse.json(
        { error: "名前は必須です" },
        { status: 400 }
      );
    }

    if (isNaN(age)) {
      return NextResponse.json(
        { error: "年齢が不正です" },
        { status: 400 }
      );
    }

    if (has_license && !license_grade) {
      return NextResponse.json(
        { error: "資格保有者は級を選択してください" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from("participants")
      .insert([
        {
          name,
          age,
          has_license,
          license_grade,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
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
    console.error("UNEXPECTED ERROR:", err);
    return NextResponse.json(
      { error: err.message || "サーバーエラー" },
      { status: 500 }
    );
  }
}