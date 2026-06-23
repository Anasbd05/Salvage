import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    await resend.emails.send({
      from: "Salvage <noreply@fluencywave.com>",
      to: email,
      subject: "Réservation refusée",
      html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 20px auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea; color: #333333; line-height: 1.6;">
  
  <h2 style="color: #e53e3e; font-size: 22px; margin-top: 0; margin-bottom: 16px; font-weight: 600;">
    Bonjour ${name},
  </h2>

  <p style="margin-bottom: 14px; font-size: 15px;">
    Nous sommes désolés, mais votre demande de réservation n'a pas pu être acceptée.
  </p>

  <p style="margin-bottom: 24px; font-size: 15px; color: #4a5568;">
    Vous pouvez effectuer une nouvelle demande pour une autre date.
  </p>

  <p style="margin-bottom: 20px; font-size: 14px; font-style: italic; color: #718096;">
    Merci de votre compréhension.
  </p>

  <hr style="border: 0; border-top: 1px solid #edf2f7; margin-bottom: 20px;" />

  <p style="margin: 0; font-size: 14px; font-weight: bold; color: #2d3748;">
    L'équipe Salvage 🚗
  </p>
  
</div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
