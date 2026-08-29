# Sip & Stretch

A guided 60-minute stretch-class app for Cruise Control Fitness events: a timed,
full-screen sequence of stretches with pose art, left/right sides, and two built-in
sip breaks. Built for Orangetheory-style bodies — hips, hamstrings, calves,
T-spine, neck, and a long savasana.

**This GitHub repository (`main` branch) is the single source of truth.**
If what you're running looks different from what's described here, you are on a
stale copy — see "Staying in sync" below.

## Running the class

- **Easiest (Windows):** double-click **`Start Sip and Stretch.cmd`** in this folder.
  It grabs the latest version from GitHub (when the copy is clean) and opens the app.
- **Manual:** open `dist/index.html` directly in a browser, or run `npm run dev`.

During class: **→** next stretch/side · **←** back · **Space** pause/resume.

## The program (~60 min)

Arrive & Breathe 5:00 → Figure Four 1:30/side → Knee to Chest 1:30/side →
Hamstring 1:30/side → Spinal Twist 1:30/side → Neck Release 1:30/side →
Sip Break 3:00 → Lying Quad 2:00/side → Cat-Cow 1:30 → Cobra 1:00 →
Child's Pose 1:30 → Thread the Needle 1:30/side → Low Lunge 1:30/side →
Pigeon 1:30/side → Sip Break 3:00 → Cross-Body Shoulder 1:00/side →
Chest Opener 1:30 → Calf & Achilles 1:00/side → Side Bend 1:30/side →
Butterfly 1:30 → Seated Forward Fold 2:00 → Savasana 5:00

Check the current total any time: `npm run program`

## Editing the program

Everything about the class lives in `src/sip-and-stretch.jsx`:

- `CLASS_DATA` — every stretch's name, duration (seconds), instructions, and
  modifications. Bilateral stretches run their duration **per side**.
- `ORDERED_STRETCH_IDS` — the actual play order.

After changing it: `npm run program` (check total), `npm run build` (refresh
`dist/`), then commit and push to `main`.

## Staying in sync (read this after time away)

This app is edited from multiple places (this PC, Claude sessions in the cloud).
The rule that prevents drift:

1. **Before touching anything:** `git checkout main` and `git pull`.
2. **After any change:** commit and push. An edit that isn't pushed does not exist
   as far as anyone else (including future Claude sessions) can tell.
3. If `git status` shows modified files you don't remember making, don't guess —
   ask Claude to reconcile ("help me sync sip-and-stretch").
