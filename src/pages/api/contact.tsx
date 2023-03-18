import type { NextApiRequest, NextApiResponse } from "next";

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
    //captcha passes, continue to wp api...
    const date = new Date().toISOString;

    const body = {
      avatar_url: "https://www.team3132.com/images/applogo.png",
      username: "TDU Website",
      embeds: [
        {
          type: "rich",
          timestamp: date,
          color: 3066993,
          fields: [
            {
              name: "Name",
              value: req.body.name,
            },
            {
              name: "Email",
              value: req.body.email,
            },
            {
              name: "Message",
              value: req.body.message,
            },
          ],
          footer: {
            text: `Received ${new Date().toDateString()}`,
          },
        },
      ],
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });

    // let response = await axios.post(process.env.WEBHOOK_URL, );

    res.status(response.status).json({ status: response.statusText });
  }
}
