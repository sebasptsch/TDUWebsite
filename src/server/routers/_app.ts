import { z } from "zod";
import { procedure, router } from "../trpc";
import tbaRouter from "./tba";
import youtubeRouter from "./youtube";
import env from "../env";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { EmbedBuilder } from "@discordjs/builders";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  tba: tbaRouter,
  youtube: youtubeRouter,
  contact: procedure
    .input(
      z.object({
        email: z.string().email(),
        message: z.string(),
        name: z.string(),
        captchaToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const googleUrl =
        "https://www.google.com/recaptcha/api/siteverify?secret=" +
        env.CAPTCHA_SECRET +
        "&response=" +
        input.captchaToken;

      const response = await fetch(googleUrl).then((res) => res.json());

      if (!response.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Captcha failed",
        });
      }

      const md5hashedEmail = crypto
        .createHash("md5")
        .update(input.email)
        .digest("hex");

      const gravatarUrl = `https://www.gravatar.com/avatar/${md5hashedEmail}?d=identicon`;

      const date = Date.now();

      const embed = new EmbedBuilder()
        .setTimestamp(date)
        .setColor(3066993)
        .setFields(
          {
            name: "Email",
            value: input.email,
          },
          {
            name: "Message",
            value: input.message,
          }
        )
        .setAuthor({
          name: input.name,
          iconURL: gravatarUrl,
        });

      const body = {
        avatar_url: "https://www.team3132.com/images/applogo.png",
        username: "TDU Website",
        embeds: [embed.toJSON()],
      };

      const webhookUrl = env.WEBHOOK_URL;

      if (!webhookUrl)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "WEBHOOK_URL not set",
        });

      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!webhookResponse.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Webhook failed",
        });
      }

      return {
        success: true,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
