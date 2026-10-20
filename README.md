# Mayerfeld Bookstore

A responsive bookstore storefront built with **Next.js** and **React**.

## Getting started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

## Available scripts

- `npm run dev` starts the Next.js development server.
- `npm run build` creates a production build.
- `npm start` serves the production build locally.
- `npm run lint` runs ESLint.
- `npm run db:generate` generates the Prisma client.
- `npm run db:migrate` applies committed migrations to PostgreSQL.
- `npm run db:seed` upserts the starter book catalog.
- `npm run db:studio` opens Prisma Studio.

## PostgreSQL setup

1. Create a PostgreSQL database (for example, a free Neon project).
2. Copy `.env.example` to `.env.local` and add your credentials. Set
   `DATABASE_URL` to the pooled connection URL for the app and `DIRECT_URL` to
   the direct connection URL for Prisma migrations.
3. Generate the client, apply the schema, and seed products:

   ```sh
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

Environment files are ignored by Git; never commit database credentials or
authentication secrets.

## Storefront features

- Responsive bookstore navigation and hero section
- Book catalog with category filtering and quantity controls
- Staff recommendations, store highlights, and upcoming events
- Newsletter signup and cart quantity display
