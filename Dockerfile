# Install dependencies only when needed
FROM node:lts-bullseye-slim 
WORKDIR /app
COPY ./public ./public
COPY  ./.next ./.next
COPY  ./node_modules ./node_modules
COPY  ./package.json ./package.json

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn start"]
 