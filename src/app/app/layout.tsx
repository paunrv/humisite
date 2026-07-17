import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Auth gate for everything under /app. School chrome lives in (school)/layout. */
export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return children;
}
