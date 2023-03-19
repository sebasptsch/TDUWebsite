import { EmbedBuilder } from "@discordjs/builders";
import type { NextRequest } from "next/server";
import hash from 'object-hash'

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
) {

  const body = await req.json();

  const captchaToken = body.captchaToken;
  const email = body.email;
  const message = body.message;
  const name = body.name;

  if (!captchaToken) return new Response("Captcha token not found", { status: 500 });
  if (!email) return new Response("Email not found", { status: 500 });
  if (!message) return new Response("Message not found", { status: 500 });
  if (!name) return new Response("Name not found", { status: 500 });


  const googleUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    process.env.CAPTCHA_SECRET +
    "&response=" +
    captchaToken;

  const webhookUrl = process.env["WEBHOOK_URL"];

  if (!webhookUrl) return new Response("Webhook URL not found", { status: 500 });

  const captchaResponse = await fetch(googleUrl).then((res) => res.json());
  // console.log(captchaResponse);
  if (!captchaResponse.success) {
    return new Response(
      JSON.stringify({ success: false, message: "captcha failed" }),
      {
        headers: {
          "content-type": "application/json",
        },
        status: 500,
      }
    )
  } else {

    const md5hashedEmail = hash(email, { algorithm: 'md5' })

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5hashedEmail}?d=identicon`;
    //captcha passes, continue to wp api...
    
    const date = Date.now();

    const embed = new EmbedBuilder()
      .setTimestamp(date)
      .setColor(3066993)
      .setFields(
        {
          name: "Email",
          value: email,
        },
        {
          name: "Message",
          value: message,
        }
      ).setAuthor({
        name: name,
        iconURL: gravatarUrl,
      });

    const body = {
      avatar_url: "https://www.team3132.com/images/applogo.png",
      username: "TDU Website",
      embeds: [embed.toJSON()]
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, message: "webhook failed" }),
        {
          headers: {
            "content-type": "application/json",
          },
          status: 500,
        }
      )
    }
    

    return new Response(
      JSON.stringify({ success: true, message: "message sent" }),
      {
        headers: {
          "content-type": "application/json",
        },
        status: 200,
      }
    )
  }
}
