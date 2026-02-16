"use client";

import { PageLayout, PageHeader, InfoCard, PageSection, InfoGrid, ContentCard } from "@/components/layout";
import { Scale, CheckCircle2, GitBranch, FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <PageHeader
                    title="Terms of Service"
                    description="Simple and transparent terms for using our platform."
                    gradient
                />

                <InfoGrid cols={2}>
                    <InfoCard
                        title="Free to Use"
                        description="Access our branch name generator completely free of charge. No registration or hidden fees required."
                        icon={CheckCircle2}
                    />
                    <InfoCard
                        title="As-Is Service"
                        description="We provide this tool on an as-is basis. While we strive for perfection, we are not liable for any inaccuracies in generated branch names."
                        icon={Scale}
                    />
                </InfoGrid>

                <ContentCard>
                    <PageSection title="Detailed Information" icon={FileText}>
                        <p>
                            By accessing and using GitNameX, you agree to be bound by these Terms of Service. This ensures a safe and productive environment for all our users.
                        </p>
                    </PageSection>

                    <PageSection title="1. Fair Use Policy">
                        <p>
                            Permission is granted for personal and commercial use of our branch name generator. However, you may not use our service for any illegal purposes or attempt to disrupt the platform through automated scraping.
                        </p>
                    </PageSection>

                    <PageSection title="2. Limitation of Liability">
                        <p>
                            In no event shall GitNameX be liable for any damages arising out of the use or inability to use the materials on our platform, including loss of data or profit.
                        </p>
                    </PageSection>

                    <PageSection title="3. Branch Naming Conventions">
                        <p>
                            While we aim to generate branch names following common conventions, it is your responsibility to ensure the generated names comply with your team's or organization's git policies.
                        </p>
                    </PageSection>
                </ContentCard>
            </div>
        </PageLayout>
    );
}
