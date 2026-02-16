"use server";

import { resend } from "@/lib/resend";
import { getContactEmailHtml, getConfirmationEmailHtml } from "@/lib/email-templates";

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
        return { error: "All fields are required" };
    }

    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM;

    if (!contactEmail || !emailFrom) {
        return { error: "Email configuration is missing" };
    }

    try {
        // Send email to admin
        const adminEmail = await resend.emails.send({
            from: `Convert Case Contact <${emailFrom}>`,
            to: [contactEmail],
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: getContactEmailHtml(name, email, subject, message),
        });

        if (adminEmail.error) {
            console.error("Resend admin email error:", adminEmail.error);
            return { error: adminEmail.error.message };
        }

        // Send confirmation email to user
        try {
            await resend.emails.send({
                from: `Convert Case <${emailFrom}>`,
                to: [email],
                subject: "We've received your message!",
                html: getConfirmationEmailHtml(name),
            });
        } catch (confirmErr) {
            // Don't fail the whole action if confirmation email fails
            console.error("Failed to send confirmation email:", confirmErr);
        }

        return { success: true, data: adminEmail.data };
    } catch (err) {
        console.error("Server error:", err);
        return { error: "Failed to send email. Please try again later." };
    }
}
