import { z } from "zod";
import { procedure, router } from "../trpc";
import env from "../env";
import { google, youtube_v3 } from "googleapis";

const ThumbnailSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string(),
});

const MinimalItemSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  channelId: z.string(),
  description: z.string(),
  thumbnails: z.object({
    default: ThumbnailSchema,
  }),
  channelTitle: z.string(),
  id: z.string(),
});

type MinimalItem = z.infer<typeof MinimalItemSchema>;

const youtubeRouter = router({
  playlist: procedure
    .input(z.string())
    .output(z.array(MinimalItemSchema))
    .query(async ({ input }) => {
      const client_email = env.GOOGLE_CLIENT_EMAIL;
      const private_key = env.GOOGLE_PRIVATE_KEY;
      const client_id = env.GOOGLE_CLIENT_ID;

      if (!client_email || !private_key || !client_id)
        throw new Error("Missing Google credentials");

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
        playlistId: `${input}`,
      });

      const { items } = response.data;

      if (!items) return [];

      const minimalItems: Array<MinimalItem> = [];

      items.forEach((item) => {
        try {
          const parsedItem = MinimalItemSchema.parse(item);

          minimalItems.push(parsedItem);
        } catch (error) {
          console.error(error);
        }
      });

      return minimalItems;
    }),
});

export default youtubeRouter;
