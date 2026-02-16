"use client";

import { PageLayout, PageHeader, InfoCard, PageSection, InfoGrid, ContentCard } from "@/components/layout";
import { ShieldCheck, Lock, Eye, GitBranch } from "lucide-react";

export default function PrivacyPage() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <PageHeader
                    title="Privacy Policy"
                    description="Your privacy is our top priority. Learn how we handle your data."
                    gradient
                />

                <InfoGrid cols={2}>
                    <InfoCard
                        title="Local Processing"
                        description="All branch name generation happens locally in your browser using JavaScript. Your task names never leave your device and are never sent to our servers."
                        icon={Lock}
                    />
                    <InfoCard
                        title="No Data Storage"
                        description="We do not store, log, or track any of the task names you input. Once you close the tab or refresh the page, your data is gone."
                        icon={ShieldCheck}
                    />
                </InfoGrid>

                <ContentCard>
                    <PageSection title="Detailed Information" icon={Eye}>
                        <p>
                            At GitNameX, we are committed to providing a secure and private environment for all developers. This policy outlines our limited data collection practices.
                        </p>
                    </PageSection>

                    <PageSection title="1. Data Collection">
                        <p>
                            We do not collect any personal identification information (PII). We may use anonymous analytics to understand general usage patterns and improve our user experience, but this never includes the task names or branch names you generate.
                        </p>
                    </PageSection>

                    <PageSection title="2. Cookies">
                        <p>
                            We use minimalist cookies strictly for functional purposes, such as remembering your theme preference (if applicable) or for security measures.
                        </p>
                    </PageSection>

                    <PageSection title="3. Contact Privacy">
                        <p>
                            If you choose to contact us via email, your email address will only be used to respond to your inquiry and will never be shared with third parties.
                        </p>
                    </PageSection>
                </ContentCard>
            </div>
        </PageLayout>
    );
}
