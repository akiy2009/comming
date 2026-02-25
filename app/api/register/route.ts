import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, age, has_license, license_grade } = body;

    // 🛡 バリデーション
    if (!name || name.trim().length === 0) {
      return Response.json(
        { error: "名前を入力してください" },
        { status: 400 }
      );
    }

    if (!age || age <= 0) {
      return Response.json(
        { error: "正しい年齢を入力してください" },
        { status: 400 }
      );
    }

    if (has_license && !license_grade) {
      return Response.json(
        { error: "級を選択してください" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("participants")
      .insert([
        {
          name: name.trim(),
          age: Number(age),
          has_license: Boolean(has_license),
          license_grade: has_license ? license_grade : null,
        },
      ])
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      id: data.id,
    });

  } catch (err) {
    return Response.json(
      { error: "サーバーエラー" },
      { status: 500 }
    );
  }
}