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
it comes with the command `deno deploy` and allows you to deploy your code to the cloud without any infrastructure
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
For macOs and Linux `curl -fsSL https://deno.land/install.sh | sh`
```

### For Windows
```bash
and for Windows `iwr https://deno.land/x/install/install.ps1 | iex`
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

### Step 3: Open main.ts and write a console statement to say hello world
```typescript
console.log('Hello, World!'); // you should now see Hello, World! in your terminal
```