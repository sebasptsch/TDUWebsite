// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextRequest } from "next/server";
import { Award, OpenAPI, TeamService } from "tba-api-v3client-ts";

export const config = {
  runtime: "edge",
};

function onlyUnique(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index;
}

export default async function hander(req: NextRequest) {
  const tbaKey = process.env["TBA_KEY"];

  if (typeof tbaKey !== "string") {
    return new Response("TBA Key not found", { status: 500 });
  }

  OpenAPI.HEADERS = {
    "X-TBA-Auth-Key": tbaKey,
  }

  if (!tbaKey) return new Response("TBA Key not found", { status: 500 });

  const awardsFRC3132 = await TeamService.getTeamAwards("frc3132");
  const awardsFRC5331 = await TeamService.getTeamAwards("frc5331");

  const joinedAndSortedAwards = awardsFRC3132
    .concat(awardsFRC5331)
    .sort((a, b) => b.year - a.year);

  const years = joinedAndSortedAwards.map((award) => award.year);
  const uniqueYears = years.filter(onlyUnique);

  const awardsByYear: { [year: number]: Array<Award> } = uniqueYears.reduce(
    (acc, year) => {
      // @ts-ignore
      acc[year] = joinedAndSortedAwards
        .filter((award) => award.year === year)
        .map((award) => {
          const { name, recipient_list, award_type, event_key }: Award = award;

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

  return new Response(JSON.stringify(awardsByYear), {
    headers: {
      "content-type": "application/json",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
    status: 200,
  });
}
