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
COPY --link package.json yarn.lock .yarnrc.yml ./
COPY --link .yarn ./.yarn
RUN yarn install

# Copy application code
COPY --link . .

# RUN yarn install

# Generate Prisma Client
# RUN yarn nx run lov-db:prisma-generate
RUN ls -la ./libs/lov-db/src/generated/client


# Build application
RUN yarn nx run backend:build:production

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "run", "start" ]
