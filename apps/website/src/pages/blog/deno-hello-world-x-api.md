---
layout: "../../layouts/BlogPost.astro"
title: "Day 2 - Hello World with Deno and x.com (twitter) API"
description: "Say hello to the world on x.com"
pubDate: "May 29 2024"
heroImage: "/deno-hello-world.jpeg"
---

## Pre-requisites
1. Create an account on [X](https://x.com)
2. Create a new app on [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
3. Generate your personal access token and secret

### 1. Creating an Account on Twitter
If you do not already have an account, create one for free. This is required to be able to create a developer account 
to gain API access.

1. Go to (Twitter)[https://twitter.com]
2. Sign up for a new account
3. Verify your email address
4. You now have a Twitter account

### 2. Create a Developer Account on Twitter
Once you have a Twitter account, you can create a developer account by going to the (Twitter Developer Portal)[https://developer.twitter.com/en/portal/dashboard].

1. Go to (Twitter Developer Portal)[https://developer.twitter.com/en/portal/dashboard]
2. Sign in with your Twitter account
3. Create a new developer account - select the Free option (credit card it not required)
4. Follow the instructions and fill in the description for why you are creating the application. You can use 
(256 characters), `I'm building an app to learn how to integrate with the Twitter API. Following a comprehensive tutorial, I'm guided through creating the app, setting up API access, and exploring features like fetching tweets, posting updates, and managing user interactions. This hands-on project boosts my API integration skills.`

### 3. Generating a Personal Access Token

1. Click on the auto-generated app (screenshot above in my example shows Hello World)
![img.png](/deno-hello-world-twitter-x-app.png)

2. Scroll down to the Apps and click on the Key button
![img.png](/deno-hello-world-twitter-x-apps.png)

3. Generate `Access Token and Secret` for your twitter username
![img.png](/deno-hello-world-twitter-x-token-generate.png)

4. Now save the generated `Access Token` and `Secret` to your local env file
Create a file named `.env` in the root of your project and add the following content.

```bash
X_ACCESS_TOKEN=YOUR_API_KEY
X_ACCESS_TOKEN_SECRET=YOUR_API_SECRET
```
