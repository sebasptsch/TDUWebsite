# Install dependencies only when needed
FROM node:alpine AS base
ENV NODE_ENV production
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Production image, copy all the files and run next
FROM node:alpine AS prod
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000


CMD ["yarn", "start"]
