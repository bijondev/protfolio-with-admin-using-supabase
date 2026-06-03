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

export async function createProject(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("projects").insert({
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    description: String(formData.get("description") || ""),
    tags: parseList(formData.get("tags")),
    highlights: parseList(formData.get("highlights")),
    year: String(formData.get("year") || ""),
    github_url: String(formData.get("github_url") || ""),
    live_url: String(formData.get("live_url") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("projects")
    .update({
      title: String(formData.get("title") || ""),
      subtitle: String(formData.get("subtitle") || ""),
      description: String(formData.get("description") || ""),
      tags: parseList(formData.get("tags")),
      highlights: parseList(formData.get("highlights")),
      year: String(formData.get("year") || ""),
      github_url: String(formData.get("github_url") || ""),
      live_url: String(formData.get("live_url") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}
