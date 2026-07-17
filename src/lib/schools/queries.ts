import { createClient } from "@/lib/supabase/server";
import type { SchoolMembership } from "./types";

export async function getSchoolMemberships(): Promise<SchoolMembership[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("school_members")
    .select(
      `
      id,
      school_id,
      user_id,
      role,
      created_at,
      school:schools (
        id,
        name,
        city,
        status,
        created_by,
        created_at
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .map((row) => {
      const school = Array.isArray(row.school) ? row.school[0] : row.school;
      if (!school) return null;
      return {
        id: row.id as string,
        school_id: row.school_id as string,
        user_id: row.user_id as string,
        role: row.role as SchoolMembership["role"],
        created_at: row.created_at as string,
        school,
      } satisfies SchoolMembership;
    })
    .filter((row): row is SchoolMembership => row !== null);
}

export async function getPrimaryMembership(): Promise<SchoolMembership | null> {
  const memberships = await getSchoolMemberships();
  return memberships[0] ?? null;
}
