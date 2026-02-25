import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { decodedText } = await req.json();

    if (!decodedText) {
      return NextResponse.json(
        { error: "IDがありません" },
        { status: 400 }
      );
    }

    const cleanId = decodedText.trim();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("participants")
      .update({ checked_in: true })
      .eq("id", cleanId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "該当ユーザーなし" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: data });

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "サーバーエラー" },
      { status: 500 }
    );
  }
}