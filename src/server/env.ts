import { z } from "zod";

const EnvSchema = z.object({
    TBA_KEY: z.string().optional(),
    GOOGLE_CLIENT_EMAIL: z.string().optional(),
    GOOGLE_PRIVATE_KEY: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    CAPTCHA_SECRET: z.string().optional(),
    WEBHOOK_URL: z.string().optional(),
})

const env = EnvSchema.parse(process.env);

export default env;