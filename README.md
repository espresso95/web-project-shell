# Web Project Shell

Framework-independent shared assets for standalone web projects.

This repository produces the small, versioned layer that connects independent projects to the main collection: typography, design tokens, focus styles, and a shared home control.

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
    └── project-shell.js
```

The production collection can expose those files at `/_system/v1/` with a rewrite to this repository's Vercel deployment.

Projects use the assets independently of their framework:

```html
<link rel="stylesheet" href="/_system/v1/base.css" />
<script type="module" src="/_system/v1/project-shell.js"></script>

<web-project-shell home-url="/" label="YOUR NAME"></web-project-shell>
```

Major identity changes receive a new source and output directory such as `v2`. Existing versions remain available.
