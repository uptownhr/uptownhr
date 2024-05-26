---
layout: "../../layouts/BlogPost.astro"
title: "Day 1 - Hello World with Deno"
description: "What you can get done in a day with Deno"
pubDate: "May 25 2024"
heroImage: "/placeholder-hero.jpg"
---
I've been following and giving Deno a shot from time to time. Today I'm going to give it a shot and write it about it 
from the perspective of writing a tutorial for someone who is new to programming. Node and Bun also exists but I'm
specifically choosing Deno because 1, I want to compare against node, 2 because Deno comes with `deno deploy` and that 
greatly simplifies bringing your code to life on the web.


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
The simpliest form of hello world that everyone knows. Let's make our program log out `hello world`. 

### Step 1: Create a new file called `hello.ts` 
From your terminal create a new file called `hello.ts` and open it in your favorite editor.

### Step 2: Write a Console statement to say hello world
```typescript
console.log("Hello, World!");
```

### Step 3: Run the program
```bash
deno run hello.ts
```