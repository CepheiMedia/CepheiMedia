import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const budgetLabels: Record<string, string> = {
  starter: "Starter — Under $3K/mo",
  growth: "Growth — $3K – $10K/mo",
  scale: "Scale — $10K+/mo",
};

const serviceLabels: Record<string, string> = {
  dtm: "DTM — Growth Marketing",
  ddm: "DDM — Brand & Design",
  both: "Both DTM + DDM",
};

/**
 * POST /api/inquiries
 * Sends an email notification when a new inquiry is submitted.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const serviceLine = serviceLabels[body.services] || body.services;
    const budgetLine = budgetLabels[body.budget] || body.budget;

    await resend.emails.send({
      from: "Cephei Media <notifications@cepheimedia.com>",
      to: ["alan@cepheimedia.com"],
      subject: `New Inquiry from ${body.name}`,
      replyTo: body.email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 12px;">New Inquiry Submitted</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #71717a; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #18181b; font-weight: 600;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #71717a;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${body.email}" style="color: #2563eb;">${body.email}</a></td>
            </tr>
            ${body.phone ? `<tr><td style="padding: 8px 0; color: #71717a;">Phone</td><td style="padding: 8px 0; color: #18181b;">${body.phone}</td></tr>` : ""}
            ${body.company ? `<tr><td style="padding: 8px 0; color: #71717a;">Company</td><td style="padding: 8px 0; color: #18181b;">${body.company}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #71717a;">Services</td>
              <td style="padding: 8px 0; color: #18181b; font-weight: 600;">${serviceLine}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #71717a;">Budget</td>
              <td style="padding: 8px 0; color: #18181b; font-weight: 600;">${budgetLine}</td>
            </tr>
            ${body.details ? `<tr><td style="padding: 8px 0; color: #71717a; vertical-align: top;">Details</td><td style="padding: 8px 0; color: #18181b;">${body.details}</td></tr>` : ""}
          </table>
          <p style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e4e4e7; color: #a1a1aa; font-size: 12px;">
            Submitted via cepheimedia.com intake form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
