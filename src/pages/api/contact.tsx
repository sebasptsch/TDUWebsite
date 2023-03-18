import { EmbedBuilder } from "@discordjs/builders";
import type { NextApiRequest, NextApiResponse } from "next";
import nodeCrypto from "crypto";

export default async function ContactApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const googleUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    process.env.CAPTCHA_SECRET +
    "&response=" +
    req.body.captchaToken;

  const webhookUrl = process.env["WEBHOOK_URL"];

  if (!webhookUrl) return res.status(200);

  const captchaResponse = await fetch(googleUrl).then((res) => res.json());
  // console.log(captchaResponse);
  if (!captchaResponse.success) {
    res.status(500).json({ success: false, message: "captcha failed" });
  } else {

    const md5hashedEmail = nodeCrypto.createHash('md5').update(req.body.email).digest("hex");

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5hashedEmail}?d=identicon`;
    //captcha passes, continue to wp api...

    const date = Date.now();

    const embed = new EmbedBuilder()
      .setTimestamp(date)
      .setColor(3066993)
      .setFields(
        {
          name: "Email",
          value: req.body.email,
        },
        {
          name: "Message",
          value: req.body.message,
        }
      ).setAuthor({
        name: req.body.name,
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

   


    console.error(response, body);

    // let response = await axios.post(process.env.WEBHOOK_URL, );

    res.status(response.status).json({ status: response.statusText });
  }
}
