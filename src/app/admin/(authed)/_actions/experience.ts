"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function client() {
  return createClient();
}

function parseList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createExperience(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("experience").insert({
    role: String(formData.get("role") || ""),
    company: String(formData.get("company") || ""),
    period: String(formData.get("period") || ""),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description") || ""),
    skills: parseList(formData.get("skills")),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("experience")
    .update({
      role: String(formData.get("role") || ""),
      company: String(formData.get("company") || ""),
      period: String(formData.get("period") || ""),
      location: String(formData.get("location") || ""),
      description: String(formData.get("description") || ""),
      skills: parseList(formData.get("skills")),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}
