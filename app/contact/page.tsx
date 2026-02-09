"use client";

import { PageLayout, PageHeader, ContentCard } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, Globe } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "@/lib/actions";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const result = await sendEmail(formData);

        setIsSubmitting(false);
        if (result.success) {
            setSubmitted(true);
        } else {
            alert(result.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <PageHeader
                    title="Get in Touch"
                    description="Have questions or feedback? We'd love to hear from you. Our team is here to help and improve your experience."
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <ContentCard className="h-full">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email Us</h3>
                                        <p className="text-muted-foreground">hello@convertcase.net</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Live Support</h3>
                                        <p className="text-muted-foreground">Available Mon-Fri, 9am - 5pm EST</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Globe className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Global Reach</h3>
                                        <p className="text-muted-foreground">Trusted by users worldwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border/50 mt-auto">
                                <h4 className="font-semibold mb-4 text-sm text-primary uppercase tracking-wider">Social Channels</h4>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { label: "LinkedIn", href: "https://www.linkedin.com/in/montasim" },
                                        { label: "GitHub", href: "https://github.com/montasim" }
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all text-sm font-medium"
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </ContentCard>
                    </div>

                    <div className="lg:col-span-3">
                        <ContentCard className="h-full">
                            {submitted ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500 py-12">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <Send className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold">Message Sent!</h2>
                                        <p className="text-muted-foreground max-w-sm">
                                            Thank you for reaching out. Our team will get back to you as soon as possible.
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSubmitted(false)}
                                        className="rounded-xl px-8"
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" name="name" placeholder="John Doe" required className="rounded-xl bg-background/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-xl bg-background/50" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" name="subject" placeholder="How can we help?" required className="rounded-xl bg-background/50" />
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                            className="rounded-xl bg-background/50 min-h-[150px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </ContentCard>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
