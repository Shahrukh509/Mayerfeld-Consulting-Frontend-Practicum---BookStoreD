import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to seed PostgreSQL.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const products = [
  {
    slug: 'the-midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    priceInCents: 1899,
    badge: 'Literary',
    coverClass: 'cover-espresso',
  },
  {
    slug: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Fiction',
    priceInCents: 2250,
    badge: 'Sci-Fi',
    coverClass: 'cover-rust',
  },
  {
    slug: 'the-thursday-murder-club',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    category: 'Fiction',
    priceInCents: 1699,
    badge: 'Mystery',
    coverClass: 'cover-olive',
  },
  {
    slug: 'the-starless-sea',
    title: 'The Starless Sea',
    author: 'Erin Morgenstern',
    category: 'Fiction',
    priceInCents: 1950,
    badge: 'Fantasy',
    coverClass: 'cover-plum',
  },
  {
    slug: 'educated-a-memoir',
    title: 'Educated: A Memoir',
    author: 'Tara Westover',
    category: 'Non-Fiction',
    priceInCents: 1799,
    badge: 'Memoir',
    coverClass: 'cover-amber',
  },
  {
    slug: 'an-immense-world',
    title: 'An Immense World',
    author: 'Ed Yong',
    category: 'Non-Fiction',
    priceInCents: 2100,
    badge: 'Science',
    coverClass: 'cover-espresso',
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non-Fiction',
    priceInCents: 2399,
    badge: 'Psychology',
    coverClass: 'cover-rust',
  },
  {
    slug: 'sapiens-a-brief-history',
    title: 'Sapiens: A Brief History',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    priceInCents: 2450,
    badge: 'History',
    coverClass: 'cover-olive',
  },
];

try {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.info(`Seeded ${products.length} products.`);
} finally {
  await prisma.$disconnect();
}
