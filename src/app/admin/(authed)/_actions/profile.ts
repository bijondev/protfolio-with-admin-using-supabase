"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

function getClient() {
  return createClient();
}

export async function updateProfile(formData: FormData) {
  const supabase = await getClient();
  const update: Partial<Profile> = {
    full_name: String(formData.get("full_name") || ""),
    short_name: String(formData.get("short_name") || ""),
    role: String(formData.get("role") || ""),
    tagline: String(formData.get("tagline") || ""),
    email: String(formData.get("email") || ""),
    location: String(formData.get("location") || ""),
    availability: String(formData.get("availability") || ""),
    initials: String(formData.get("initials") || ""),
    github_url: String(formData.get("github_url") || ""),
    linkedin_url: String(formData.get("linkedin_url") || ""),
    twitter_url: String(formData.get("twitter_url") || ""),
    website_url: String(formData.get("website_url") || ""),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profile").update(update).eq("id", 1);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
