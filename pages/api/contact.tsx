// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let googleUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    process.env.CAPTCHA_SECRET +
    "&response=" +
    req.body.captchaToken;

  let captchaResponse = await axios({
    url: googleUrl,
  });

  if (captchaResponse.data.success === false) {
    res.status(500).json({ success: false, message: "captcha failed" });
  } else {
    //captcha passes, continue to wp api...
    const date = new Date().toISOString;
    let response = await axios.post(process.env.WEBHOOK_URL, {
      avatar_url: "https://thethunderdownunder.org/images/applogo.png",
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
            text: `Recieved ${new Date().toDateString()}`,
          },
        },
      ],
    });

    res.status(response.status).json({ status: response.statusText });
  }
};
