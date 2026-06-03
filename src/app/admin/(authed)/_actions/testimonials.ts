"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function client() {
  return createClient();
}

export async function createTestimonial(formData: FormData) {
  const supabase = await client();
  const { error } = await supabase.from("testimonials").insert({
    quote: String(formData.get("quote") || ""),
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    initials: String(formData.get("initials") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await client();
  const { error } = await supabase
    .from("testimonials")
    .update({
      quote: String(formData.get("quote") || ""),
      name: String(formData.get("name") || ""),
      role: String(formData.get("role") || ""),
      initials: String(formData.get("initials") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await client();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
