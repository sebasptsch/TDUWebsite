// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

interface Award {
  award_type: number;
  event_key: string;
  name: string;
  recipient_list: Array<{
    awardee: string;
    team_key: string;
  }>;
  year: number;
}

export default async function TBAAwards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tbaKey  = process.env["TBA_KEY"]

  if (!tbaKey) return res.status(200).json([])

  const response = await fetch(
    `https://www.thebluealliance.com/api/v3/team/frc3132/awards/${req.query.year}`,
    {
      headers: {
        "X-TBA-Auth-Key": tbaKey,
      },
    }
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  if (response.status === 200) {
    const data = await response.json();
    const awards: Array<Award> = data;
    const awardsList = awards.reverse().map((award) => {
      const { name, recipient_list, award_type, event_key }: Award = award;
      return {
        name,
        recipient_list: recipient_list
          .filter((awardee) => awardee.team_key === "frc3132")
          .filter((awardee) => awardee.awardee !== null)
          .map((awardee) => awardee.awardee),
        event_key,
        award_type,
      };
    });
    res.status(response.status).json(awardsList);
  } else if (response.status === 304) {
    res.status(304);
  } else if (response.status === 401) {
    res.status(401);
  }
  res.end();
}
