# Dynamic UI Editor

A React app that provides a dynamic editor for customizing UI components (typography, buttons, galleries, layout, stroke/border) and a live preview. Includes layout switching and JSON export/import.

## Features
- Typography: font family, weight, size.
- Button: border radius, shadow, alignment, background and text color.
- Galleries: alignment variants, spacing, image border radius.
- General layout: card radius, container padding, section background color.
- Stroke/border: stroke color and weight.
- Layout switching: Layout A and Layout B.
- Live preview updates instantly.
- Export configuration as JSON and import JSON to load a configuration.
- Persists configuration to `localStorage`.

## Run locally
1. `npm install`
2. `npm start`

Open http://localhost:3000

## Files of interest
- `src/Editor.js` — the sidebar UI controls
- `src/Preview.js` — live preview component that consumes config
- `src/App.js` — state management and import/export

## Notes & Decisions
- No backend required — state is stored in localStorage and can be exported as JSON.
- Google fonts are included via `public/index.html`.
- Simple CSS + inline styles are used for live dynamic style updates.
- You can extend: add more controls, more layout variants, or an actual WYSIWYG canvas to drag elements.

dynamic-ui-editor/
├── README.md
├── package.json
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json        ← (optional; auto from CRA)
│
└── src/
    ├── index.js
    ├── App.js
    ├── Editor.js
    ├── Preview.js
    ├── styles.css
    └── assets/
        └── (optional images/icons if you add any)