# Install dependencies only when needed
FROM node:alpine
RUN apk add --no-cache libc6-compat bash
WORKDIR /app
COPY ./public ./public
COPY  ./.next ./.next
COPY  ./node_modules ./node_modules
COPY  ./package.json ./package.json

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000
SHELL ["/bin/bash", "-c"]
CMD ["/bin/bash -c", "yarn start"]
 