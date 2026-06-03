"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function client() {
  return createClient();
}

export async function createStat(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("stats").insert({
    label: String(formData.get("label") || ""),
    value: String(formData.get("value") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true };
}

export async function updateStat(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("stats")
    .update({
      label: String(formData.get("label") || ""),
      value: String(formData.get("value") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true };
}

export async function deleteStat(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("stats").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/stats");
  return { success: true };
}
