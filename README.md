# Template Base Project

A headless CMS + Next.js base project built with [Payload CMS](https://payloadcms.com) and PostgreSQL.

This project is intended to be used as a template for future website builds. The expected workflow is:

1. Duplicate this project into a new project folder.
2. Create a separate database and environment values for the new project.
3. Update branding, content model, routes, and deployment settings for that new project.
4. Treat this repository as the base starting point, not as a production site tied to a single client.

## Current Role

This folder is the template/base version of the project at:

- Server path: `/var/www/template`
- Git remote: `git@github.com:Gaia-Digital-Agency/openclaw_base.git`

It was copied from the working `gaiadaweb` project and is being separated into a reusable starter for future projects.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **CMS**: Payload CMS 3.80
- **Database**: PostgreSQL 18
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Package Manager**: pnpm

## Intended Usage For New Projects

When starting a new project from this template:

- duplicate the project folder
- create a new PostgreSQL database and database user
- update `.env`
- update `NEXT_PUBLIC_SERVER_URL`
- update nginx or domain routing
- update collections, globals, seed data, branding, and frontend content
- commit the new project to its own repository if needed

Do not keep future duplicated projects on the same database as another project.

## Environment Variables

The project uses the standard environment values below:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Payload secret |
| `NEXT_PUBLIC_SERVER_URL` | Public base URL |
| `CRON_SECRET` | Cron auth secret |
| `PREVIEW_SECRET` | Preview auth secret |

## Project Structure

Top-level folders of note:

- `src` - application source
- `public` - public assets
- `scripts` - maintenance and utility scripts
- `tests` - test configuration and test files
- `docs` - project documentation and prompts
- `config/tooling` - moved tooling config files
- `database_backup` - compressed database backups created on the server

Important root files still remain at project root because the framework/tooling expects them there, including:

- `next.config.ts`
- `tsconfig.json`
- `postcss.config.js`
- `tailwind.config.mjs`
- `package.json`
- `.env`

## Tooling Notes

The following config files were moved into `config/tooling` to keep the root cleaner:

- `config/tooling/eslint.config.mjs`
- `config/tooling/next-sitemap.config.cjs`

`package.json` scripts were updated to point to those new paths.

## Database Backup

A compressed database backup for the template project can be stored in:

- `database_backup/`

Example backup created on the server:

- `database_backup/template_db_20260404_055332.sql.gz`

## Build Status

Current state as of April 4, 2026:

- the project has been repointed to the `openclaw_base` remote
- multiple TypeScript and script import issues have already been fixed
- the production build is still not fully clean yet
- remaining work is focused on TypeScript cleanup in app and seed files

So this project is already usable as a base template, but it still needs additional cleanup before being considered a fully clean production-ready starter.

## Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Build:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

Lint:

```bash
pnpm lint
```

## Notes

This README should describe the template state of the project, not the original `gaiadaweb` deployment state.

If this project is duplicated for a new client or internal build, update this README in that new copy to reflect the new project database, URL, deployment path, and business purpose.
