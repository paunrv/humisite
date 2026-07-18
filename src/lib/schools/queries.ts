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
    console.error("[schools] memberships query failed", error);
    throw new Error(error.message);
  }

  const rows = data ?? [];
  if (rows.length === 0) {
    return [];
  }

  // If embed fails (RLS on schools), fall back to a second query by school_id.
  const mapped = rows.map((row) => {
    const school = Array.isArray(row.school) ? row.school[0] : row.school;
    return {
      id: row.id as string,
      school_id: row.school_id as string,
      user_id: row.user_id as string,
      role: row.role as SchoolMembership["role"],
      created_at: row.created_at as string,
      school: school as SchoolMembership["school"] | null,
    };
  });

  const missingSchoolIds = mapped
    .filter((row) => !row.school)
    .map((row) => row.school_id);

  if (missingSchoolIds.length > 0) {
    const { data: schools, error: schoolsError } = await supabase
      .from("schools")
      .select("id, name, city, status, created_by, created_at")
      .in("id", missingSchoolIds);

    if (schoolsError) {
      console.error("[schools] fallback schools query failed", schoolsError);
      throw new Error(schoolsError.message);
    }

    const byId = new Map((schools ?? []).map((s) => [s.id as string, s]));
    for (const row of mapped) {
      if (!row.school) {
        row.school = (byId.get(row.school_id) as SchoolMembership["school"]) ?? null;
      }
    }
  }

  return mapped.filter(
    (row): row is SchoolMembership => row.school !== null,
  );
}

export async function getPrimaryMembership(): Promise<SchoolMembership | null> {
  const memberships = await getSchoolMemberships();
  return memberships[0] ?? null;
}
