# shopify-nuxt Documentation

> Documentation site for `shopify-nuxt` — a Nuxt 4 module for building Shopify apps.

Built with [Docus](https://docus.dev) (Nuxt Content + Nuxt UI).

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The docs site will be running at `http://localhost:3000`.

## Project Structure

```
docs/
├── content/
│   ├── index.md                  # Homepage
│   ├── 1.getting-started/        # Getting Started section
│   │   ├── 2.introduction.md
│   │   ├── 3.installation.md
│   │   ├── 4.project-structure.md
│   │   ├── 5.configuration.md
│   │   ├── 6.requirements.md
│   │   └── 7.troubleshooting.md
│   ├── 2.guides/                 # Guides section
│   │   ├── 1.authentication.md
│   │   ├── 2.webhooks.md
│   │   ├── 3.app-bridge.md
│   │   └── 4.polaris-components.md
│   └── 3.api/                    # API Reference section
│       ├── 1.server-utilities.md
│       ├── 2.composables.md
│       ├── 3.components.md
│       └── 4.types.md
├── public/                       # Static assets
└── package.json
```

## Built with

- [Nuxt 4](https://nuxt.com) — The web framework
- [Nuxt Content](https://content.nuxt.com/) — File-based CMS
- [Nuxt UI](https://ui.nuxt.com) — UI components
- [Docus](https://docus.dev) — Documentation theme

## Build for production

```bash
bun run build
```

## License

[MIT License](https://opensource.org/licenses/MIT)
