# Digital Voting System

A voting app built with HTML, TypeScript, and Tailwind CSS. Voters enter their name, choose a candidate, and cast a vote. Live results update instantly with a leaderboard and a winner announcement.

## What it does

- Enter a name and pick a candidate to vote
- Prevents the same name from voting twice, in the same session
- Shows a live vote count per candidate
- Shows total votes cast
- Displays a sorted leaderboard, updating with every vote
- Announces the current leading candidate in a popup after each vote

## Tech stack

- **HTML** - structure
- **TypeScript** - all app logic, compiled to JavaScript for the browser
- **Tailwind CSS** (via CDN) - styling

No frameworks, no backend, no build tools beyond the TypeScript compiler itself.

## Project structure

index.html - the page structure
script.ts - TypeScript source, all app logic and types
script.js - compiled output of script.ts, what the browser actually runs

## Running it locally

You need the [TypeScript compiler](https://www.typescriptlang.org/) installed globally:

```bash
npm install -g typescript
```

Compile the source file:

```bash
tsc script.ts
```

This generates `script.js`. Then just open `index.html` in a browser (or use a tool like VS Code's Live Server extension).

If you edit `script.ts`, re-run `tsc script.ts` to regenerate `script.js` before refreshing the browser.

## Why TypeScript

This started as a plain JavaScript project. Converting it to TypeScript meant defining an explicit `Votes` interface for the candidate data, typing every DOM element lookup (so the code knows exactly what kind of element it's working with, not just "some element"), and using `keyof` to restrict candidate names to only valid options anywhere in the app. This catches mistakes, like a typo in a candidate name, at compile time instead of letting them fail silently in the browser.

## Known limitations

- Vote tracking resets on page refresh (`localStorage.clear()` runs on load), this isn't a persistent voting record
- "One vote per person" is enforced by name matching in the current browser session only, not by real authentication

## Built by

Afunogu Stephanie Chinaecherem, HackathonAfrica 3.0, AfricaPlan Foundation.
