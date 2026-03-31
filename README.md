# GaiaDa Web

A headless CMS + Next.js website built with [Payload CMS](https://payloadcms.com) and PostgreSQL, running on a self-hosted VPS.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **CMS**: Payload CMS 3.80
- **Database**: PostgreSQL 18 (native, no Docker)
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Package Manager**: pnpm

## URLs

| Environment | URL |
|---|---|
| Frontend | `http://34.124.244.233/gaiadaweb` |
| Admin Panel | `http://34.124.244.233/gaiadaweb/admin` |

## Local Setup

1. Clone the repo and `cd` into it
2. Copy env: `cp .env.example .env` and fill in values
3. Install deps: `pnpm install`
4. Start dev server: `pnpm dev`

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | JWT encryption key |
| `NEXT_PUBLIC_SERVER_URL` | Public base URL (no trailing slash) |
| `CRON_SECRET` | Cron job auth secret |
| `PREVIEW_SECRET` | Live preview auth secret |

### Database

PostgreSQL 18 running natively on the server.

- **Database**: `gaiadaweb_db`
- **User**: `gaiadaweb_user`
- **Port**: `5432`

To run migrations manually:

```bash
pnpm payload migrate:create   # create new migration
pnpm payload migrate          # run pending migrations
```

> Payload auto-pushes schema changes in development (`push: true` by default).

## Server Deployment

The app runs behind nginx on port `3000`. The nginx location block at `/gaiadaweb` proxies to `http://127.0.0.1:3000`.

To start the dev server:

```bash
nohup pnpm dev > /tmp/gaiadaweb-dev.log 2>&1 &
```

To build and run in production:

```bash
pnpm build
pnpm start
```

## Collections

| Collection | Description |
|---|---|
| **Users** | Admin users with authentication |
| **Posts** | Blog posts with drafts, versioning, scheduled publish |
| **Pages** | Dynamic pages with layout builder |
| **Media** | File uploads with auto-resized image variants |
| **Categories** | Nested taxonomy for posts |

## Globals

- **Header** — navigation links
- **Footer** — footer content

## Features

- Layout builder (Hero, Content, Media, CTA, Archive, Form blocks)
- Draft preview + Live preview
- On-demand ISR revalidation
- SEO plugin (meta, OG, sitemap)
- Full-text search
- Redirects management
- Scheduled publishing via jobs queue
- Dark mode
- JWT authentication
