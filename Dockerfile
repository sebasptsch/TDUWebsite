# Install dependencies only when needed
FROM node:lts-buster-slim AS base
ENV NODE_ENV production
RUN ls

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn", "start"]
