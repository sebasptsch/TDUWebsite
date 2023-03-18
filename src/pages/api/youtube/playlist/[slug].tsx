import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const youtube = google.youtube({ version: "v3" });

export default async function PlaylistRes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  const private_key = process.env.GOOGLE_PRIVATE_KEY;
  const client_id = process.env.GOOGLE_CLIENT_ID;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      client_id,
      private_key,
    },
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  const youtube = google.youtube({
    auth,
    version: "v3",
  });

  //   const response = await youtube.channels.list({
  //     id: 'UCZMli3czZnd1uoc1ShTouQw',
  //     part: 'statistics'
  //   });
  const response = await youtube.playlistItems.list({
    part: ["snippet"],
    playlistId: `${req.query.slug}`,
  });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  res.status(200).json(
    response.data.items?.map((item) => {
      const {
        publishedAt,
        channelId,
        title,
        description,
        thumbnails,
        channelTitle,
        resourceId,
      } = item.snippet;
      return {
        title,
        publishedAt,
        channelId,
        description,
        thumbnails,
        channelTitle,
        id: resourceId.videoId,
      };
    })
  );
}
