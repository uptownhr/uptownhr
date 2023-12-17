# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NestJS/Prisma"

# NestJS/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ARG YARN_VERSION=3.3.1

# Install Yarn 3
RUN corepack enable && \
    yarn set version ${YARN_VERSION}


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

# Install node modules
COPY --link . .
#COPY --link package.json yarn.lock .yarnrc.yml ./
#COPY --link .yarn ./.yarn
RUN yarn

# Copy application code


# Build application
RUN yarn nx run backend:build:production
RUN yarn ncc build dist/apps/backend/main.js
RUN ls -la ./dist/apps/backend
RUN ls -la ./dist

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl ca-certificates fuse3 sqlite3 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# COPY LITEFS
COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

# Copy built application
COPY --from=build /app/dist/index.js /app/index.js
COPY --from=build /app/dev.env /app/.env
COPY --from=build /app/libs/lov-db/prisma/migrations /app/migrations
COPY --from=build /app/libs/lov-db/prisma/schema.prisma /app/schema.prisma

COPY --from=build /app/libs/lov-db/src/generated/client/libquery_engine-debian-openssl-3.0.x.so.node /app/libquery_engine-debian-openssl-3.0.x.so.node
COPY --from=build /app/litefs.yml /app/litefs.yml

RUN yarn add prisma@^5
RUN npx playwright install

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["sh", "-c", "yarn prisma migrate deploy && node index.js"]
