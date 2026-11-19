# Six by Nine

A personal landing page with five sections, presented as a rotating revolver cylinder. Select a section using the sidebar or a chamber. Chambers also respond to pointer hover.

## Adding a section

Add a sidebar button, a chamber button with the same `data-section`, and a content section with the matching `id` in `index.html`. Keep the sidebar and chamber buttons in the same order. The rotation angle adjusts to the number of sidebar buttons, but the chamber positions in `styles.css` are currently designed for five; adding another requires repositioning them (and potentially resizing them to fit). Update the displayed section numbers as needed.

The site is static and has no build step. To preview it locally:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. The previous neon preview URL redirects to the main page.
