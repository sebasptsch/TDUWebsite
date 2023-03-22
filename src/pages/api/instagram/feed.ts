import { NextRequest } from "next/server";

export default async function handler(req: NextRequest) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    return new Response("No access token found", { status: 500 });
  }
  // console.log("accessToken", accessToken)
  const url = `https://graph.instagram.com/2187701866/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`;

  
  const res = await fetch(url);

  const data = await res.json();

  console.log("data", data)

  return new Response(JSON.stringify(data), {
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
