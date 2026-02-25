import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { decodedText } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("participants")
    .update({ checked_in: true })
    .eq("id", decodedText)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, user: data });
}