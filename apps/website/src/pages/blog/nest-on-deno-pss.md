---
layout: '../../layouts/BlogPost.astro'
title: 'My Personal Newsletter API with NestJS on Deno'
description: "Running NestJS on Deno (Yes, It's Possible!)"
pubDate: 'June 12 2024'
heroImage: '/nest-hello-deno.jpeg'
---

## Why a Newsletter API?

1. Not everyone uses an RSS reader and my website doesn't offer a way to
   subscribe.
2. I needed a project to test out running NestJS on Deno and deploying to Deno
   Cloud.

## The Plan

1. No other third party dependencies other than the Deno Cloud runtime. This
   means I have access to Deno Runtime, the Deno KV and Deno Cron.
2. Develop APIs that are accessible by the website to capture email addresses
   and verify them.

The actual sending of email addresses will be a follow-up project. I have not
visualized what will go into the newsletter yet and still thinking through the
design. For now, let's allow potential subscribers to register and verify their
email addresses.
