import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, phone, message, eventName } = body;

    if (!name || !email || !message || !eventName) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "STM Events <onboarding@resend.dev>",
      to: "morganstanly1515@gmail.com",
      subject: `New Booking Request: ${eventName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0a0a0a; color: #ffffff;">
          <div style="border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">New Booking Request</h1>
            <p style="margin: 8px 0 0; color: #a78bfa; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">${eventName}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">Name</td>
              <td style="padding: 12px 0; color: #fff; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; color: #fff; font-size: 15px;"><a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
              <td style="padding: 12px 0; color: #fff; font-size: 15px;">${phone}</td>
            </tr>
            ` : ""}
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #111; border-radius: 12px; border: 1px solid #222;">
            <p style="margin: 0 0 8px; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;">Message</p>
            <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>

          <p style="margin-top: 30px; color: #333; font-size: 11px; text-align: center;">Sent via STM Events Booking Form</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return Response.json(
      { error: "Failed to send booking request" },
      { status: 500 }
    );
  }
}
