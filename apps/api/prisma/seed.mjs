import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const prisma = new PrismaClient();
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Admin12345';

async function main() {
  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      passwordHash: adminPasswordHash,
    },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: adminPasswordHash,
    },
  });

  const coursesPath = resolve(process.cwd(), '../../courses.json');
  const raw = await readFile(coursesPath, 'utf-8');
  const courses = JSON.parse(raw);

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        slug: course.slug,
        title: course.title,
        category: course.category,
        description: course.description,
        image_url: course.image_url ?? null,
        hours: course.hours,
        rating: course.rating,
        price: course.price,
        best_sellers: course.best_sellers ?? false,
        tagsJson: JSON.stringify(course.tags ?? []),
      },
      create: {
        slug: course.slug,
        title: course.title,
        category: course.category,
        description: course.description,
        image_url: course.image_url ?? null,
        hours: course.hours,
        rating: course.rating,
        price: course.price,
        best_sellers: course.best_sellers ?? false,
        tagsJson: JSON.stringify(course.tags ?? []),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
