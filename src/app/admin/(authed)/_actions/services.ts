"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function client() {
  return createClient();
}

export async function createService(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("services").insert({
    icon: String(formData.get("icon") || "globe"),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("services")
    .update({
      icon: String(formData.get("icon") || "globe"),
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}
