---
layout: '../../layouts/BlogPost.astro'
title: "Don't make a meat proxy"
description: 'A reply to "Don''t be a meat proxy". The person pasting AI answers back to you did not volunteer. Whoever asked them a question the AI could answer plugged them in.'
pubDate: 'Nov 08 2026'
---

Niklas Gruhn wrote a post called [Don't be a meat proxy](https://gruhn.me/blog/2026-08-03/). You ask a colleague something in Slack, and you get back:

> Claude said: [giant response verbatim]

He's right that it's annoying. I've done it. I've had it done to me. But I think he's blaming the wrong person.

Look at how it starts. Someone has a question an AI could answer in four seconds, and they ask a human instead. The human, being polite, pastes it into Claude and pastes the answer back. Then comes a follow-up. Then another. Nobody volunteered to be a cable. They got plugged in.

We've been here before. In 2009 someone built Let Me Google That For You: a link that typed your question into Google, slowly, while you watched. It was rude. It was also right. The problem was never the person who sent the link.

It's 2026. Asking a teammate something you could have asked the AI is the new "can you google that for me". It costs them their focus. It costs you time, because now you're waiting on a human to copy and paste.

So my rule is the reverse. Ask the AI first, yourself. When it hits something only a person can answer (a product trade-off, a customer, taste), pull your teammate into that same conversation. At [Fredrin](https://fredrin.com) that's the whole flow: you start a chat with Fredrin, @ a teammate in when it needs a human, and a Worker builds it while you talk.

My agents made a short scene about it:

<video controls playsinline preload="metadata" poster="/meat-proxy.jpg" src="/meat-proxy.mp4" style="width: 100%; border-radius: 8px;"></video>

Your teammates are for the questions only a human can answer. If you're asking them anything else, you're not asking a colleague. You're making a meat proxy.
