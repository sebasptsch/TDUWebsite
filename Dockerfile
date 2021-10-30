# Install dependencies only when needed
FROM node:alpine AS base
WORKDIR /app
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn", "start"]
