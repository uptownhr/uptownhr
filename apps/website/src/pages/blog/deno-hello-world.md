---
layout: "../../layouts/BlogPost.astro"
title: "Day 1 - Hello World with Deno"
description: "What you can get done in a day with Deno"
pubDate: "May 25 2024"
heroImage: "/placeholder-hero.jpg"
---
I've been following and giving Deno a shot from time to time. In this post, I'm going to explore what getting started
with Deno looks like, and I am writing a tutorial for someone who is new to programming. I am however assuming minimal
experience with Javascript/Typescript and will not cover syntax. Deno has also specifically been chosen because 
it comes with the command `deployctl` and allows you to deploy your code to the cloud without any infrastructure
knowledge. 

## First What is Deno?
Deno is a runtime for JavaScript and TypeScript that is based on the V8 JavaScript engine and the Rust programming language.
It was created by Ryan Dahl, the original creator of Node.js. Deno aims to provide a more secure and modern runtime for
JavaScript and TypeScript developers. It comes with a built-in package manager, a set of standard modules, and a secure
sandbox for running code. Deno is designed to be a replacement for Node.js and aims to address some of the shortcomings
of the Node.js runtime.

## Getting Started - Installation
### For MacOSX and Linux
```bash
curl -fsSL https://deno.land/install.sh | sh
```

### For Windows
```bash
iwr https://deno.land/x/install/install.ps1 | iex
````

## Hello World
The simplest form of hello world that everyone knows. Let's make our program log out `hello world`. 

### Step 1: Initialize a new project
```bash
deno init hello-world
cd hello-world
```

### Step 2: Start developer mode
Running this command will start a file watcher that will run your program everytime you save a file.
```bash
deno task dev
```

### Step 3: It's alive
Open main.ts and write a console statement to say hello world
```typescript
console.log('Hello, World!');
```
You should now see `Hello, World!` in your terminal.

## Hello World with HTTP
Let's take it a step further and create a simple web server that will respond with `Hello, World!` when you visit
`http://localhost:8000` from your web browser.

### Step 1: A simple web server
We will use `Deno.serve` to create a simple web server. Update `main.ts` to look like this:
```typescript
Deno.serve({ port: 8000 }, (): Response => {
  const body = `hello world`;

  console.log('body', body);

  return new Response(body, { status: 200 });
});
```

Because we are now start a server that exposes itself to the network, we need to run the program with the 
`--allow-net` flag. You'll notice that you are now prompted to allow network access in the terminal. 

```bash
Watcher Process started.
┌ ⚠️  Deno requests net access to "0.0.0.0:8000".
├ Requested by `Deno.listen()` API.
├ Run again with --allow-net to bypass this prompt.
└ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) >    
```
Select `y` to allow network access.

### Step 2: access the server from your browser
Open your browser and visit `http://localhost:8000`. You should see `hello world` in your browser.

### Step 3: Deploying to the cloud
Deno comes with a built-in command to deploy your code to the cloud `deployctl`. 
The following are steps to install the command and deploy your code to the cloud. 

> :warning: **Note**: You will need to create an account on [deno.com/deploy](https://deno.com/deploy) 
> to deploy your code.

#### Installing the deployctl command
```bash
deno install -A jsr:@deno/deployctl 
```
#### Logging into Deno Cloud and Deploying to the cloud
```bash
deployctl deploy  // this will attempt to login and deploy your code to the cloud
- ℹ Using config file '/Users/james/Projects/uptownhr/uptownhr/apps/deno-hello-world/deno.json'
- ⚠ No project name or ID provided with either the --project arg or a config file.
- ? Guessing project name 'uptownhr-uptownhr': you already own this project. Should I deploy to it? [y/N] y
- ⚠ No entrypoint provided with either the --entrypoint arg or a config file. I've guessed 'main.ts' for you.
  ℹ Is this wrong? Please let us know in https://github.com/denoland/deployctl/issues/new
- ✔ Deploying to project uptownhr-uptownhr.
  ℹ The project does not have a deployment yet. Automatically pushing initial deployment to production (use --prod for further updates).
- ✔ Entrypoint: /Users/james/Projects/uptownhr/uptownhr/apps/deno-hello-world/main.ts
- ℹ Uploading all files from the current dir (/Users/james/Projects/uptownhr/uptownhr/apps/deno-hello-world)
- ✔ Found 3 assets.
- ✔ Uploaded 3 new assets.
- ✔ Production deployment complete.
- ✔ Updated config file '/Users/james/Projects/uptownhr/uptownhr/apps/deno-hello-world/deno.json'.

View at:
 - https://uptownhr-uptownhr-bb05s0xen29v.deno.dev
 - https://uptownhr-uptownhr.deno.dev
```
Note the 2 view at links. One is a snapshot of the deployment you've just performed, and the other is the current live
version of your website. In the future, when you make further deployments, the live link with the weird characters will
will be updated with the new deployment.

Click and visit either one of these links and you should see `hello world` in your browser. Because this is in the cloud,
you can share this link with any of your friends and they will be able to see your website. 

Congrats! You are now live!