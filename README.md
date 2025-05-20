# Snap-n-Split

Cross platform receipt parsing and bill splitting application.

## Monorepo Layout

- `apps/mobile` – Expo React Native app for iOS, Android and Web.
- `apps/web` – Web entry (shares code with mobile via Expo).
- `packages/ui` – Reusable UI components.
- `packages/receipt-parser` – OpenAI GPT-4o helper for extracting receipt data.
- `server` – Edge functions and Supabase helpers.
- `docs` – Architecture and security docs.

## Setup

1. Install `pnpm`.
2. Copy `.env.sample` to `.env` and fill values.
3. Run `pnpm install`.
4. Start development with `pnpm dev`.

## Contributing

Use conventional commits.
Run `pnpm lint && pnpm test` before submitting a PR.


