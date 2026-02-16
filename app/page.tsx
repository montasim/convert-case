import { BranchNameGenerator } from "@/components/branch-name-generator";
import { PageLayout } from "@/components/layout";

export default function Home() {
  return (
    <PageLayout>
      <BranchNameGenerator />
    </PageLayout>
  );
}
