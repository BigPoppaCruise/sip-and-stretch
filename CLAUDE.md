# Sip & Stretch — session guardrails

A 60-minute guided stretch-class app (React + Vite) run at live Cruise Control
Fitness events. The owner touches this project roughly once a month or less, so
assume they are returning cold.

## Version-drift check — do this FIRST, every session

`main` on GitHub is the single source of truth. This project has previously
diverged badly (2026-08-29: the live class ran from an **uncommitted local edit**
on the owner's PC while cloud sessions edited `main`-based branches; a full
program review was run against the wrong version). Before reviewing or editing
the program:

1. Run `git status` and `git log --oneline -3`, and fetch/compare against
   `origin/main`.
2. If the working tree is dirty, HEAD is not on `main`, or local and
   `origin/main` have diverged — **STOP and tell the user before editing**.
   Name exactly which version is which (a quick discriminator: which stretches
   exist — see the program list in README.md) and reconcile first. Never assume
   the checked-out code is what the user runs at events.
3. If the user reports the app "doesn't show the changes," the first hypothesis
   is a stale or divergent copy, not a bug.

## Where things live

- **The entire program** (stretch data + play order): `src/sip-and-stretch.jsx`
  — `CLASS_DATA` (durations are seconds; `bilateral: true` runs the duration
  PER SIDE, doubling it) and `ORDERED_STRETCH_IDS` (the play order).
- Pose images: `public/poses/` (painted/flat PNGs; keep paths in
  `src/poseImages.js` **relative** — `poses/x.png`, not `/poses/x.png` — so
  `dist/index.html` works when opened as a file). Vite `base` is `'./'` for the
  same reason; don't change either.
- `dist/` is committed on purpose: the owner opens `dist/index.html` directly
  (also via `Start Sip and Stretch.cmd`). After any src change, run
  `npm run build` and commit the refreshed `dist/`.

## Verifying changes

- `npm run program` prints the play order and total runtime. Target ≈ 60:00
  (owner is fine with slightly over). Both "savasanas" — the opening
  Arrive & Breathe and the closing Savasana — are 5:00 by explicit owner request.
- Run `npx eslint src/` and `npm run build` before committing.

## History notes (so old branches don't mislead anyone)

- 2026-08-29: program review landed on `main` (savasana 5:00, pigeon moved
  before break 2, trims, butterfly + neck release images, skip-on-last-stretch
  bug fix). Any `claude/*` branches still on the remote are DEAD — fully
  absorbed into or superseded by `main`: `claude/add-exercise-arrow-navigation-6oL7r`
  (afdfe2e, absorbed), `claude/funny-pike` (3dfa795) and
  `claude/adjust-exercise-image-layout-jTcq0` (79c300c, same-day March
  experiments superseded by the April UI rework), and the review branch
  `claude/sip-stretch-program-review-rgui66` (merged via PRs #1/#2). Never
  base new work on them; branch from `main`. It is safe to delete them.
- The one-off "Frog Stretch" and "Happy Baby" were deliberately REMOVED from the
  program by the owner (replaced by seated Butterfly and Neck Release). Do not
  reintroduce them from old branches or old research summaries.
