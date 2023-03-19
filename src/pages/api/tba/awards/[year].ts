// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextRequest } from "next/server";

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

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextRequest,
) {
  const tbaKey  = process.env["TBA_KEY"]

  if (!tbaKey) return new Response("TBA Key not found", { status: 500 });

  const urlParams = new URL(req.url).searchParams;

  const year = urlParams.get("year");

  const response = await fetch(
    `https://www.thebluealliance.com/api/v3/team/frc3132/awards/${year}`,
    {
      headers: {
        "X-TBA-Auth-Key": tbaKey,
      },
    }
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
    return new Response(
      JSON.stringify(awardsList),
      {
        headers: {
          "content-type": "application/json",
          "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
        status: response.status,
      }
    )
  } else {
    return new Response(
      JSON.stringify([]),
      {
        headers: {
          "content-type": "application/json",
          "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
        status: response.status,
      }
    )
  }
}
