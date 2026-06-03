"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function client() {
  return createClient();
}

export async function createSkill(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("skills").insert({
    name: String(formData.get("name") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("skills")
    .update({
      name: String(formData.get("name") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
