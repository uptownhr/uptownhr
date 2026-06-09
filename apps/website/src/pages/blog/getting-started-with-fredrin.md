---
layout: '../../layouts/BlogPost.astro'
title: 'Getting Started with Fredrin: A Beginner''s Guide'
description: 'A friendly introduction to Fredrin, the desktop kanban board that lets you run many AI-coding tasks in parallel. Learn what it is, how to get started, and how to turn everyday requests into tickets.'
pubDate: 'Jun 09 2026'
heroImage: '/placeholder-hero.jpg'
---

If you've ever wished you could hand off a stack of small tasks and have them all worked on at once instead of one at a time, Fredrin is built for exactly that. This guide is for first-time users. No prior setup knowledge required - by the end you'll understand what Fredrin is, how it works, and how to turn a plain-English request into a task it can run.

## What Is Fredrin?

Fredrin is a **desktop kanban board for running many AI-coding tickets in parallel**.

Let's unpack that one piece at a time:

- A **kanban board** is the familiar columns-of-cards layout you may have seen in tools like Trello or a whiteboard full of sticky notes. Cards move from left to right as work progresses.
- A **ticket** is a single card - one unit of work, like "fix the typo on the homepage" or "add a contact form."
- **In parallel** is the key idea: instead of working through your list one item at a time, Fredrin can have several tickets being worked on simultaneously, each by its own AI assistant.

Think of it as a team of tireless assistants, each one quietly working on a different task, while you watch their progress move across a board.

## The Big Idea: One Ticket, One Worker

The heart of Fredrin is a simple rule: **one ticket, one Worker**.

A **Worker** is a single AI-coding session dedicated to one ticket. Each Worker gets its own isolated copy of the project to work in, so the tasks never trip over each other. While one Worker is writing a blog post, another can be fixing a bug, and a third can be updating a settings page - all at the same time, and none of them interfering with the others.

This is where the productivity comes from. You're no longer the bottleneck. You describe the work, press a button, and many things happen at once.

## How Work Moves: The Five Columns

Every ticket travels left to right across five columns. You don't have to memorize a process - the board updates itself automatically as work happens.

1. **Backlog** - The task has been written down but hasn't started yet. It's waiting for you to press **Run**.
2. **Running** - A Worker is actively on the job right now.
3. **Blocked** - The Worker hit a question it can't answer on its own and needs your input before continuing.
4. **Review** - The Worker finished. Now it's your turn to glance at the result and decide: ship it, or send it back with notes.
5. **Completed** - You approved the work (or the change was merged). Done.

The beauty of this flow is that the board moves on its own. When you press Run, the ticket slides into **Running**. When the Worker finishes, it slides into **Review**. The only manual steps are the human decisions: starting work, answering questions, and giving the final thumbs-up.

## Turning a Request Into a Ticket

The most practical skill in Fredrin is learning to turn an everyday request into a good ticket. The trick is to make each ticket **one clear, self-contained piece of work**.

Here are a few worked examples.

### Example 1: A simple content change

> **What you'd say to a person:** "Hey, can you add a short FAQ section to the pricing page?"

**As a ticket:**

- **Title:** Add an FAQ section to the pricing page
- **Description:** Add a short FAQ section at the bottom of the pricing page covering the three questions we get most often: refunds, plan upgrades, and cancellation. Keep the tone friendly and match the existing page style.

### Example 2: Splitting a big ask into several tickets

Sometimes a single request is really several tasks wearing a trench coat. Fredrin shines when you split them, because each piece becomes its own Worker running in parallel.

> **What you'd say to a person:** "Let's polish the website before launch - the homepage needs a clearer headline, the footer is missing a privacy link, and the blog needs a dark mode."

**As three tickets:**

- **Ticket A:** Rewrite the homepage headline to clearly state what we do
- **Ticket B:** Add a privacy-policy link to the site footer
- **Ticket C:** Add a dark-mode toggle to the blog

Press Run on all three and they're worked on at the same time, rather than waiting in line.

### Example 3: A bug report

> **What you'd say to a person:** "The newsletter signup button doesn't do anything on mobile."

**As a ticket:**

- **Title:** Fix newsletter signup button on mobile
- **Description:** On phones, tapping the newsletter signup button does nothing. It should submit the form and show the success message, just like it does on desktop.

### What makes a good ticket?

- **One outcome per ticket.** If you're tempted to write "and also," that's usually a sign you have two tickets.
- **Describe the result, not the steps.** Say what "done" looks like; let the Worker figure out how.
- **Add the context a newcomer would need.** Which page? What tone? What's the expected behavior?

## A Typical First Session

Here's what getting started actually feels like:

1. **Write a few tickets** in the Backlog - one for each thing you want done.
2. **Press Run** on the ones you want started. Watch them move to **Running**.
3. **Check back in.** Some tickets land in **Review** with finished work. If one moved to **Blocked**, it has a question waiting for you - answer it and it keeps going.
4. **Review the results.** For each finished ticket, take a quick look. Happy? Mark it **Completed**. Not quite right? Send it back with a note and it'll have another go.

That's the whole loop. Write, run, review, repeat.

## Why People Use Fredrin

- **Parallelism.** The single biggest win. Ten small tasks don't take ten times as long - they run side by side.
- **You stay in control.** Nothing ships without your review. The AI does the work; you make the calls.
- **No process overhead.** The board moves automatically. You spend your energy describing work and reviewing it, not managing status columns.
- **Isolation by default.** Each ticket works in its own sandbox, so parallel tasks never corrupt each other's work.
- **A clear picture at a glance.** One look at the board tells you what's waiting, what's in flight, and what needs your attention.

## Tips for Newcomers

- **Start small.** Try two or three simple, low-risk tickets first to get a feel for the flow before you fan out a dozen.
- **Be specific in descriptions.** The clearer the "done" state, the better the result. A good ticket reads like instructions you'd give a brand-new teammate.
- **Don't fear the Blocked column.** It's not an error - it just means the Worker is being careful and wants your input. Answering is part of the workflow.
- **Review promptly.** Tickets in Review are finished work waiting for your blessing. Clearing them keeps everything flowing.

## Wrapping Up

Fredrin turns your to-do list into a board of parallel, AI-powered work. You write tickets in plain language, press Run, and watch tasks move from Backlog to Completed - stepping in only to answer questions and approve results.

The mental model is simple: **one ticket, one Worker, many at once.** Master the art of writing one clear ticket, and you've mastered Fredrin.

Now write your first three tickets and press Run.
