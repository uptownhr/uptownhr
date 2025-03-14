---
layout: '../../layouts/BlogPost.astro'
title: 'A URL Shortener built for humans with Deno and Fresh'
description:
  'Exploring the Fresh framework in Deno to build Zap, a human-readable URL
  shortener.'
pubDate: 'June 25 2024'
heroImage: '/deno-fresh-zap.jpg'
---

After experimenting with Deno, I embarked on a project to address a common
annoyance: short URLs that are still painful to type. Often, presentations
feature shortened URLs that are difficult to input. QR codes are an alternative,
but they aren’t always convenient(ie: you're on your laptop, and not your
phone). To solve this, I created [Zap](https://zap.deno.dev), a URL shortener
that generates short, memorable, and human-readable URLs. Check out the project
at,

- [zap.deno.dev](https://zap.deno.dev)
- [Source code](https://github.com/uptownhr/zap)

## Why Fresh?

Following my initial explorations with
[Hello World](https://uptownhr.com/blog/deno-hello-world) and
[Nest on Deno](https://uptownhr.com/blog/nest-on-deno), I wanted to build a
functional product. I started with Nest, given my preference and previous
success with it on Deno. However, deploying the code to
[Deno Cloud](https://deno.com/deploy) revealed issues with Nest’s dependency
injection in the Cloud runtime, resulting in cannot call x of undefined errors.
You can follow the discussion on this issue on Github, and see a sample of the
problematic code here.

Next, I explored [Oak](https://oakserver.org/), the most popular Deno framework.
However, I encountered several drawbacks:

1.  Lack of TypeScript inference: The callback parameters lacked TypeScript
    inference, which was disappointing given Deno’s strong TypeScript support.
2.  Middleware Framework Choice: Oak is akin to Koa, but my experiences with Koa
    over Express didn’t favor Oak.
3.  Sparse Documentation: Oak’s documentation is minimal, leaving many questions
    unanswered and complicating searches for solutions.

These points led me to consider [Fresh](https://fresh.deno.dev/). Initially, I
was hesitant due to its required initialization step. Unlike a simple import,
Fresh requires project initialization and adherence to a specific structure.
However, the setup is straightforward:

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
`deno kv` can be utilized by `const kv = await Deno.openKv();` and this just
works locally or in Deno Cloud.

### Checkout out the 3 files that make up the project:

#### [index.tsx](https://github.com/uptownhr/zap/blob/a334f68eaab70c3e6e589479a8a54074692448dd/routes/index.tsx#L1-L0)

the home page and form to create a short link

```tsx
import { RedirectRepository } from '../repository.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

const repo = new RedirectRepository();

export interface CreateRedirect {
  name: string;
  url: string;
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();

    const data: CreateRedirect = {
      name: form.get('name')?.toString() || '',
      url: form.get('url')?.toString() || '',
    };

    try {
      const testUrl = new URL(data.url);
    } catch (e) {
      return new Response('Invalid URL', { status: 400 });
    }

    const response = await repo.create(data);

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set('location', `/?created=${ctx.url.origin}/${response.name}`);

    return new Response(null, {
      headers,
      status: 303, // See Other
    });
  },
};

export default function Home(props: PageProps) {
  return (
    ...
          <form className="space-y-6" action="#" method="POST">
            arc
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tiny Url Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  /*placeholder="my tech talk"*/
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Redirect Link
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Link
              </button>
            </div>
          </form>
    ...
  );
}
```

#### [name.tsx](https://github.com/uptownhr/zap/blob/81b3380ac4df2537bf7b0fe12d8c743a6f451855/routes/%5Bname%5D.tsx#L1-L32)

the route that either redirects to the defined link or shows a list of
referenced links

```tsx
import { defineRoute } from '$fresh/server.ts';
import { RedirectRepository } from '../repository.ts';
import { format } from 'date-fns';

const repo = new RedirectRepository();

export class RedirectModel {
  url: string;
  created: Date;
}

export default defineRoute(async (req, ctx) => {
  const list: RedirectModel[] = await repo.list(ctx.params.name);

  if (list.length === 1) {
    return Response.redirect(list[0].url, 307);
  } else if (list.length === 0) {
    return new Response('Not found', { status: 404 });
  }

  return (
    <ul>
      {list.map((item) => (
        <li>
          <a href={item.url}>
            {format(item.created, 'yyyy-M-d')} - {item.url}
          </a>
        </li>
      ))}
    </ul>
  );
});
```

#### [repository.ts](https://github.com/uptownhr/zap/blob/de486297bdf41e8b5ed8dda57c24868143e9ea3e/repository.ts#L1-L80)

the database layer that stores and retrieves the links

```ts
import { RedirectModel } from './routes/[name].tsx';
import { CreateRedirect } from './routes/index.tsx';
import slugify from 'slugify';
import KvKey = Deno.KvKey;

const kv = await Deno.openKv();

type RedirectUrl = string;
interface ParsedId {
  kvKey: string;
  created: number;
  name: string;
}

export class RedirectRepository {
  kvKey = 'redirects';

  constructor() {}

  async create({ name, url }: CreateRedirect) {
    const id = this.createId(this.kvKey, name);

    const created = await kv.set(id, url);

    const res = await kv.get<RedirectUrl>([...id]);

    if (res.value === null) {
      throw new Error('Failed to create redirect');
    }

    const parsed = this.parseId(res.key);

    return {
      url: res.value,
      name: parsed.name,
      created: new Date(parsed.created),
    };
  }

  async list(name?: string): Promise<RedirectModel[]> {
    const search = [this.kvKey.toLowerCase()];

    if (name) {
      search.push(name.toLowerCase());
    }

    const entries = kv.list<RedirectUrl>({ prefix: search });

    const result: RedirectModel[] = [];

    for await (const entry of entries) {
      const parsed = this.parseId(entry.key);
      result.unshift({
        url: entry.value,
        created: new Date(parsed.created),
      });
    }

    return result;
  }

  private createId(kvKey: string, name: string): [string, string, number] {
    const slug = slugify(name, { lower: true });

    return [kvKey.toLowerCase(), slug, Date.now()];
  }

  private parseId(id: KvKey): ParsedId {
    return {
      kvKey: id[0] as string,
      name: id[1] as string,
      created: id[2] as number,
    };
  }
}
```
