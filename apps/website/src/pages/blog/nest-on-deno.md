---
layout: '../../layouts/BlogPost.astro'
title: 'NestJS on Deno?'
description: "Running NestJS on Deno (Yes, It's Possible!)"
pubDate: 'June 12 2024'
heroImage: '/nest-hello-deno.jpeg'
---

# Can you run Nest in Deno?

Yes.

I'm writing this because google searches aren't very clear and almost made me
believe it won't work. I almost believed I would have to use a Deno flavored
framework that mimics Nestjs (like [oak](https://deno.land/x/oak@v16.1.0)).

However, it's straight forward to use and arguably simpler in Deno because you
can get started without Nest's CLI and it's generation requirements. Given that
Deno just works with Typescript, there is no build-step. You just import and it
works.

Maybe at one point in Deno's history it did not work, but as of now, it does.

## First what is Nest?

I really like it, for those who don't know, here's a brief overview.

> NestJS is a progressive, extensible Node.js framework for building efficient
> and scalable server-side applications. It is built with and fully supports
> TypeScript but is also compatible with JavaScript. NestJS leverages the power
> of modern JavaScript, combined with the capabilities and flexibility of
> TypeScript, to create a highly productive and modular development environment.

### Key Features of NestJS

1. **Modular Architecture:** NestJS encourages a modular approach to application
   structure, allowing developers to split their codebase into modules. This
   promotes better organization and reusability of code.

2. **Dependency Injection:** It has a powerful built-in Dependency Injection
   (DI) system that helps manage the lifecycle of dependencies and their
   relationships, making it easier to write testable, maintainable, and scalable
   applications.

3. **TypeScript Support:** While it can be used with JavaScript, NestJS is
   designed with TypeScript in mind, providing full type-checking and advanced
   TypeScript features right out of the box.

4. **Decorator-based Syntax:** Inspired by Angular, NestJS uses decorators
   (e.g., @Module, @Controller, @Injectable, etc.) to define and organize
   different parts of the application, making the code more readable and
   declarative.

5. **Built-in Support for Various Transport Layers:** NestJS natively supports
   different types of transport layers like HTTP, WebSockets, and microservices
   through built-in modules.

6. **Extensive Ecosystem:** It provides a rich set of tools and modules that
   cover various aspects of application development, including authentication,
   database integration, caching, validation, and more.

7. **Testing:** NestJS promotes best practices for testing by providing
   utilities and patterns for writing unit and end-to-end tests, ensuring your
   application is reliable and maintainable.

## Running a stand alone Nest app in Deno

### Initialize the sample project

1. create a new directory `mkdir nest-deno`
2. cd into the directory `cd nest-deno`
3. initialize a deno project `deno init`

### Adding the Core Nest dependency

`deno add npm:@nestjs/core` The deno add command adds to the import map of
`deno.json`. This allows us to import like we'd normally do instead of having to
prefix `npm:` in our imports.

`import { NestFactory } from '@nestjs/core';` vs
`import { NestFactory } from 'npm:@nestjs/core'`;

### Add the sample code into main.ts

```typescript
import { NestFactory } from '@nestjs/core';

class AppModule {}
const app = await NestFactory.createApplicationContext(AppModule);
```

### Run the app with Deno

Deno init created a task in the `deno.json` file that allows us to run the app
and watch for changes. Run the app with `deno task dev`.

To avoid having to say yes to the `Deno requests x accesss` prompts. Update the
`deno.json` file to include the `--allow-read` and `--allow-env` flag. Here's
how mine looks like.

```json
{
  "tasks": {
    "dev": "deno run --watch --allow-read --allow-env main.ts"
  },
  "imports": {
    "@nestjs/common": "npm:@nestjs/common@^10.3.9",
    "@nestjs/core": "npm:@nestjs/core@^10.3.9"
  }
}
```

### Testing if Nest's DI functionality works

1. Run `deno add npm:@nestjs/common` to add `@nestjs/common` to the import map.
2. Let's create a service and utilize dependency injection. Update `main.ts` to
   look like the following:

```typescript
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';

class HelloService {
  hello() {
    console.log('Hello World!');
  }
}

@Module({ providers: [HelloService] })
class AppModule {}
const app = await NestFactory.createApplicationContext(AppModule);

const helloService = app.get(HelloService);

helloService.hello(); // this outputs Hello World!
```

Success! So I believe this confirms you can technically use Nest in Deno :).

> You may notice that your IDE is complaining about `Module` decorator usage.
> This requires some typescript functionality that is still under the
> experimental flag. We can enable it by adding some settings to our
> `deno.json`.

### Add experimentalDecorators and emitDecoratorMetadata to deno.json

```json
{
  ...
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Attempting to run a Nest Server Application in Deno

Previously we used `NestFactory.createApplicationContext` to create a Nest app
without listening for HTTP requests. Let's try to create a Nest server
application and listen for HTTP requests.

### Let's create a Nest Application Instance (http server)

1. Update `NestFactory.createApplicationContext` to `NestFactory.create`. This
   will create a Nest server application.
2. You'll notice the error
   `No driver (HTTP) has been selected. In order to take advantage of the default driver, please, ensure to install the "@nestjs/platform-express" package ($ npm install @nestjs/platform-express)`
3. Run `deno add npm:@nestjs/platform-express` to add the package to the import
   map.
4. Update `main.ts` to look like the following:

```typescript
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import '@nestjs/platform-express';

class HelloService {
  hello() {
    console.log('Hello World!');
  }
}

@Module({ providers: [HelloService] })
class AppModule {}
const app = await NestFactory.create(AppModule);

app.listen(3000);
```

You can now verify that the server is running by visiting
`http://localhost:3000`

Although you see a 404 error, this confirms that the server is running.

Also, update the deno task in `deno.json` to include the `--allow-net` flag and
avoid the grant access prompt.

```json
{
  "tasks": {
     "dev": "deno run --watch --allow-read --allow-env --allow-net main.ts"
  },
  ...
}
```

### Let's expose our Hello Service via an HTTP endpoint

1. create a controller and inject HelloService into it.
2. register the controller in the AppModule

```typescript
class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  hello() {
    this.helloService.hello();
    return 'Hello World!';
  }
}
```

```typescript
@Module({
  providers: [HelloService],
  controllers: [HelloController],
})
```

The full `main.ts` file should look like this:

```typescript
import { NestFactory } from '@nestjs/core';
import { Get, Module } from '@nestjs/common';
import '@nestjs/platform-express';

class HelloService {
  hello() {
    return 'Hello World!'; // updated to return instead of console.log
  }
}

class HelloController {
  constructor(private helloService: HelloService) {}

  @Get('/')
  hello() {
    return this.helloService.hello();
  }
}

@Module({ providers: [HelloService], controllers: [HelloController] })
class AppModule {}
const app = await NestFactory.create(AppModule);
app.listen(3000);
```

Now verify that the new endpoint is working by visiting `http://localhost:3000`.
You'll see the message `Hello World!` displayed on the page.
