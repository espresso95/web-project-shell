# Web Project Shell

Framework-independent shared assets for standalone web projects.

This repository produces the small, versioned layer that connects independent projects to the main collection: typography, design tokens, focus styles, a shared mobile foundation, and a shared home control.

## Development

This project uses Node.js 24 and pnpm 11.

```sh
corepack pnpm install
corepack pnpm dev
```

Run the complete validation gate with:

```sh
corepack pnpm check
```

## Distribution

The build emits stable versioned assets:

```text
dist/
└── v1/
    ├── base.css
    ├── mobile.css
    └── project-shell.js
```

The production collection can expose those files at `/_system/v1/` with a rewrite to this repository's Vercel deployment.

Projects use the assets independently of their framework:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
<link rel="stylesheet" href="/_system/v1/base.css" />
<link rel="stylesheet" href="/_system/v1/mobile.css" />
<script type="module" src="/_system/v1/project-shell.js"></script>

<web-project-shell home-url="/" label="YOUR NAME"></web-project-shell>
```

`mobile.css` is deliberately layout-neutral. It supplies safe-area and dynamic-viewport variables plus opt-in attributes for safe padding, touch targets, mobile form inputs, and horizontal scrollers. Individual projects still own their responsive composition.

```css
.full-screen-view {
  min-block-size: var(--web-shell-stable-viewport-height);
  block-size: var(--web-shell-viewport-height);
}
```

Framed full-screen projects can keep foreground content below the fixed home
control with `--web-shell-content-block-start`. The value combines the device
safe area, the shared control size, and the control gap; it does not move
full-bleed backgrounds or canvases.

```html
<header data-web-safe-area></header>
<button data-web-touch-target>Open</button>
<input data-web-mobile-input />
<div data-web-scroll-x></div>
```

Major identity changes receive a new source and output directory such as `v2`. Existing versions remain available.
