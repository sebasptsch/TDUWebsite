// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

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

export default async function hander(
  req: NextRequest,
) {
  const tbaKey = process.env["TBA_KEY"]

  if (!tbaKey) return new Response("TBA Key not found", { status: 500 });

  const response = await fetch(
    `https://www.thebluealliance.com/api/v3/team/frc3132/awards`,
    {
      headers: {
        "X-TBA-Auth-Key": tbaKey,
      },
    }
  );

  function onlyUnique(value: number, index: number, self: number[]) {
    return self.indexOf(value) === index;
  }

  if (response.status === 200) {
    
    const awards: Array<Award> = await response.json();

    const years: Array<number> = awards.map((award) => award.year);
    const uniqueYears: Array<number> = years.filter(onlyUnique);

    const awardsByYear: { [year: number]: Array<Award> } = uniqueYears.reduce(
      (acc, year) => {
        // @ts-ignore
        acc[year] = awards
          .filter((award) => award.year === year)
          .map((award) => {
            const { name, recipient_list, award_type, event_key }: Award =
              award;

            return {
              name,
              recipient_list: recipient_list
                .filter((awardee) => awardee.team_key === "frc3132")
                .filter((awardee) => awardee.awardee !== null)
                .map((awardee) => awardee.awardee),
              event_key,
              award_type,
              blue:
                award_type === 0 ||
                award_type === 69 ||
                award_type === 1 ||
                award_type === 3 ||
                award_type === 74,
            };
          });
        return acc;
      },
      {}
    );
    // res.status(response.status).json(awardsByYear);
    return new Response(
      JSON.stringify(awardsByYear),
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
