// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(
    `https://www.thebluealliance.com/api/v3/team/frc3132/awards`,
    {
      headers: {
        "X-TBA-Auth-Key": process.env.TBA_KEY,
      },
    }
  );
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  if (response.status === 200) {
    const awards: Array<Award> = response.data;
    const awardsList = awards.reverse().map((award) => {
      const {
        name,
        recipient_list,
        award_type,
        event_key,
        year,
      }: Award = award;
      return {
        name,
        recipient_list: recipient_list
          .filter((awardee) => awardee.team_key === "frc3132")
          .filter((awardee) => awardee.awardee !== null)
          .map((awardee) => awardee.awardee),
        event_key,
        award_type,
        year,
      };
    });
    res.status(response.status).json(awardsList);
  } else if (response.status === 304) {
    res.status(304);
  } else if (response.status === 401) {
    res.status(401);
  }
  res.end();
};
