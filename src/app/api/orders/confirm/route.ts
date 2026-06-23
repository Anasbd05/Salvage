import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    await resend.emails.send({
      from: "Salvage <noreply@fluencywave.com>",
      to: email,
      subject: "Réservation confirmée 🚗",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 20px auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea; color: #333333; line-height: 1.6;">
  
  <h2 style="color: #38a169; font-size: 22px; margin-top: 0; margin-bottom: 16px; font-weight: 600;">
    Bonne nouvelle ${name} !
  </h2>

  <p style="margin-bottom: 14px; font-size: 15px; font-weight: 500;">
    Votre demande de réservation a été acceptée avec succès. 🎉
  </p>

  <p style="margin-bottom: 24px; font-size: 15px; color: #4a5568;">
    Nous avons hâte de vous recevoir. Vous recevrez très bientôt un e-mail avec tous les détails de votre rendez-vous.
  </p>

  <p style="margin-bottom: 20px; font-size: 14px; font-style: italic; color: #718096;">
    Merci de votre confiance.
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
