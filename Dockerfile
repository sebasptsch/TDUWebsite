# Install dependencies only when needed
FROM node:lts-bullseye-slim
WORKDIR /app
COPY --from=builder ./public ./public
COPY --from=builder --chown=nextjs:nodejs ./.next ./.next
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./package.json ./package.json

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn", "start"]
