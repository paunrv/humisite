import { HomePage } from "@/components/home/HomePage";
import { loadLegacyLanding } from "@/lib/legacy-landing";

export default function Page() {
  const legacy = loadLegacyLanding();
  return <HomePage legacy={legacy} />;
}
