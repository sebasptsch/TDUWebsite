// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function TBAEvents (req: NextApiRequest, res: NextApiResponse) {

  const tbaKey = process.env.TBA_KEY

  if (!tbaKey) return res.status(200).json([])

  const request = await fetch(`https://www.thebluealliance.com/api/v3/team/frc3132/events/simple`, {
    headers: {
      "X-TBA-Auth-Key": tbaKey,
    }
  })

  const response = await request.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
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

    res.status(request.status).json(events);
  } else if (request.status === 304) {
    res.status(304);
  } else if (request.status === 401) {
    res.status(401);
  }
  res.end();
};
