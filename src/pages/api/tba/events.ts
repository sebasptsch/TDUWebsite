// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge"
}

export default async function handler (req: NextRequest) {

  const tbaKey = process.env.TBA_KEY

  if (!tbaKey) return new Response("TBA Key not found", { status: 500 })

  const request = await fetch(`https://www.thebluealliance.com/api/v3/team/frc3132/events/simple`, {
    headers: {
      "X-TBA-Auth-Key": tbaKey,
    }
  })

  const response = await request.json(); 

  if (request.status === 200) {
    const events = response
      .filter((event: any) => new Date(event.end_date).getTime() >= Date.now())
      .map((event: any) => ({
        city: event.city,
        country: event.country,
        year: event.year,
        end: event.end_date,
        start: event.start_date,
        key: event.key,
        name: event.name,
        active: Date.now() >= new Date(event.start_date).getTime(),
      }));

    return new Response(JSON.stringify(events), {
      headers: { "content-type": "application/json", "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600" },
      status: request.status,
    });
  }

  return new Response(JSON.stringify([]), {
    headers: { "content-type": "application/json", "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600" },
    status: request.status,
  });
};
