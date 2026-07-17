export type SchoolStatus = "active" | "inactive";
export type SchoolRole = "school_admin" | "coach";

export type School = {
  id: string;
  name: string;
  city: string | null;
  status: SchoolStatus;
  created_by: string | null;
  created_at: string;
};

export type SchoolMember = {
  id: string;
  school_id: string;
  user_id: string;
  role: SchoolRole;
  created_at: string;
};

export type SchoolMembership = SchoolMember & {
  school: School;
};
