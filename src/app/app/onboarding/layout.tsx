import { redirect } from "next/navigation";
import { getPrimaryMembership } from "@/lib/schools/queries";

/** If the user already has a school, skip onboarding. */
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const membership = await getPrimaryMembership();
    if (membership) {
      redirect("/app");
    }
  } catch {
    // Migration not applied yet — still show the form (create will error until SQL runs).
  }

  return children;
}
