import { NextResponse } from "next/server";

/**
 * POST /api/inquiries
 * Sends an email notification when a new inquiry is submitted.
 * Replace the console.log with Resend or another email provider.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Replace with Resend (or similar) once API key is configured
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Cephei Media <notifications@cepheimedia.com>',
    //   to: ['team@cepheimedia.com'],
    //   subject: `New Inquiry from ${body.name}`,
    //   html: `<p><strong>${body.name}</strong> (${body.email}) submitted an inquiry.</p>
    //          <p>Company: ${body.company || 'N/A'}</p>
    //          <p>Services: ${body.services}</p>
    //          <p>Budget: ${body.budget}</p>`,
    // });

    console.log("📩 New inquiry notification:", {
      name: body.name,
      email: body.email,
      company: body.company,
      services: body.services,
      budget: body.budget,
    });

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
