# uptownhr

James's personal site, uptownhr.com, as an NX monorepo:

- `apps/website`: the site, in Astro.
- `apps/backend`: a NestJS/Prisma API, deployed to Fly as app `lov` (root `fly.toml`, on a GitHub release).
- `environments/`: Terraform.

How the site itself deploys is not recorded in this repo.

## Blog posts

One Markdown file per post in `apps/website/src/pages/blog/`, with this frontmatter:

```yaml
---
layout: '../../layouts/BlogPost.astro'
title: 'Post title'
description: 'One or two sentences.'
pubDate: 'Jun 09 2026'
heroImage: '/post-hero.jpg'
---
```

Images go in `apps/website/public/` and are referenced from the root (`/post-hero.jpg`).

## Commands

    yarn nx dev website           # dev server
    yarn nx run website:build     # build

## Context

James's business and personal context, and the registry of his other repos, live in the private `Zabaca/ceo` repo (`docs/repos.md`).
