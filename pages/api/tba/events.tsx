// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(
    `https://www.thebluealliance.com/api/v3/team/frc3132/events/simple`,
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
    const events = response.data
      .filter((event) => new Date(event.end_date).getTime() >= Date.now())
      .map((event) => ({
        city: event.city,
        country: event.country,
        year: event.year,
        end: event.end_date,
        start: event.start_date,
        key: event.key,
        name: event.name,
        active: Date.now() >= new Date(event.start_date).getTime(),
      }));

    res.status(response.status).json(events);
  } else if (response.status === 304) {
    res.status(304);
  } else if (response.status === 401) {
    res.status(401);
  }
  res.end();
};
