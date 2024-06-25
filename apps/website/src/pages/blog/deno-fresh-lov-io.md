---
layout: '../../layouts/BlogPost.astro'
title: 'Lov.io - A URL Shortener built for humans with Deno and Fresh'
description:
  'Exploring the Fresh framework in Deno to build Lov.io, a human-readable URL
  shortener.'
pubDate: 'June 25 2024'
heroImage: '/deno-hello-world.jpeg'
---

After experimenting with Deno, I embarked on a project to address a common
annoyance: short URLs that are still painful to type. Often, presentations
feature shortened URLs that are difficult to input. QR codes are an alternative,
but they aren’t always convenient(ie: you're on your laptop, and not your
phone). To solve this, I created Lov.io, a URL shortener that generates short,
memorable, and human-readable URLs. Check out the project at,

- [lov.io](https://lov.io)
- [Source code](https://github.com/uptownhr/tiny-url)

## Why Fresh?

Following my initial explorations with Hello World and Nest on Deno, I wanted to
build a functional product. I started with Nest, given my preference and
previous success with it on Deno. However, deploying the code to Deno Cloud
revealed issues with Nest’s dependency injection, resulting in cannot call x of
undefined errors. You can follow the discussion on this issue on Github, and see
a sample of the problematic code here.

Next, I explored Oak, the most popular Deno framework. However, I encountered
several drawbacks:

1.  Lack of TypeScript inference: The callback parameters lacked TypeScript
    inference, which was disappointing given Deno’s strong TypeScript support.
2.  Middleware Framework Choice: Oak is akin to Koa, but my experiences with Koa
    over Express didn’t favor Oak.
3.  Sparse Documentation: Oak’s documentation is minimal, leaving many questions
    unanswered and complicating searches for solutions.

These points led me to consider Fresh. Initially, I was hesitant due to its
required initialization step. Unlike a simple import, Fresh requires project
initialization and adherence to a specific structure. However, the setup is
straightforward:

```bash
deno run -A -r https://fresh.deno.dev
cd fresh-project
deno task start
```

Fresh also offers features similar to Next.js, such as:

- [File-based routing](https://fresh.deno.dev/docs/concepts/routing)
- [Data handling](https://fresh.deno.dev/docs/concepts/routes)
- [Island components](https://fresh.deno.dev/docs/concepts/islands)

## Why not NextJS?

Honestly, it should be NextJS. Only reason I'm preceding at this point is to
test and gauge how far Deno has come. So far, I'm impressed but there are enough
gaps that I would hold off. I will gather my thoughts in a separate post.

## So really, why Fresh?

Answer: Minimal dependencies.

Under one umbrella, I was able to get a frontend, backend, a database and a
deploy command that made my project live in a matter of an hour. Fresh + Deno
DV + Deno Cloud is pleasantly simple and minimal. Things kind of just worked.
Very little setup/configuration was needed.

Now, NextJS + Vercel also started offering Postgres and technically offers an
under one umbrella solution. However, Postgres is through a partnership
integration and requires setup that isn't built-in to the language. For example,
`deno kv` can be utilized by `const kv = await Deno.openKv();`
