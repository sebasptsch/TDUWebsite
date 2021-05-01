import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from "next";

const youtube = google.youtube({ version: "v3" })

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        },
        scopes: ['https://www.googleapis.com/auth/youtube.readonly']
    });

    const youtube = google.youtube({
        auth,
        version: 'v3'
    });

    //   const response = await youtube.channels.list({
    //     id: 'UCZMli3czZnd1uoc1ShTouQw',
    //     part: 'statistics'
    //   });
    const response = await youtube.playlistItems.list({
        part: ["snippet"],
        playlistId: `${req.query.slug}`,
    })

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=1200, stale-while-revalidate=600"
    );

    res.status(200).json(response.data.items.map(item => {
        const { publishedAt, channelId, title, description, thumbnails, channelTitle, resourceId } = item.snippet;
        return {
            title,
            publishedAt,
            channelId,
            description,
            thumbnails,
            channelTitle,
            id: resourceId.videoId
        }
    }))

}