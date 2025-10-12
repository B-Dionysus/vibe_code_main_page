Vibe Code Main Page
====================

A small interactive demo page ("Revolver Chamber") that rotates a circular chamber when hovering over words.

Preview
-------
Serve the project locally and open in your browser:

```bash
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

What changed in this repo
-------------------------
- `index.html` — main markup; interactions implemented with inline JS (later extracted to `script.js`).
- `styles.css` — styles extracted from inline styles and polished with design tokens and typography improvements.
- `script.js` — interaction logic extracted from inline script (no functional changes).

Design tokens
-------------
`styles.css` defines a small set of CSS variables at the top for quick theming:

- `--accent` — primary accent color
- `--bg` — page background
- `--surface` — surface color for the chamber
- `--muted` — muted surface used for the inner circles
- `--text` — primary text color
- `--gap` — spacing unit
- `--radius` — default border-radius
- `--ease` — transition timing function

Recovering previous changes
---------------------------
A backup branch was created before major changes. To inspect or recover those commits:

```bash
# list branches
git branch --list

# view the backup branch (name may vary)
git log backup-before-revert-* --oneline

# restore a file from the backup branch
git checkout backup-before-revert-20251012160955 -- path/to/file
```

Notes & next steps
------------------
- I extracted CSS and JS into `styles.css` and `script.js` respectively with minimal/no functional changes.
- I also applied a light polish to `styles.css` (tokens, typography and subtle shadowing) — purely visual.
- If you'd like, I can:
  - Add keyboard accessibility enhancements (Enter/Space to activate words)
  - Produce a dark theme variant using the same tokens
  - Run an accessibility scan and address any issues reported

If you want any of those, tell me which and I'll implement it.

Neon preview
------------
I added a neon theme you can preview without changing the main page. Two new files:

- `styles.neon.css` — overrides tokens with neon-friendly values (dark background, neon green accent, glow effects).
- `preview-neon.html` — a standalone preview page that reuses the same markup and `script.js` so behavior matches `index.html`.

To preview the neon theme:

```bash
python3 -m http.server 8000
# open http://localhost:8000/preview-neon.html
```
