# Install dependencies only when needed
FROM node:lts-bullseye-slim AS base
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN find /app | grep yarn.lock

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn", "start"]
