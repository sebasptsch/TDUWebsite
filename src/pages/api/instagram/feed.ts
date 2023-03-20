import { NextRequest } from "next/server";

export default function handler(req: NextRequest) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    return new Response("No access token found", { status: 500 });
  }

  const url = `https://graph.instagram.com/2187701866/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`;

  return fetch(url, {
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=12000, stale-while-revalidate=6000"
    },
  });
}

export type InstagramPost = {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
    permalink: string;
    thumbnail_url: string;
    timestamp: string;
    username: string;
};
