import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const prisma = new PrismaClient();

async function main() {
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
        duration: course.duration,
        rating: course.rating,
        price: course.price,
        visual: course.visual,
        best_sellers: course.best_sellers,
        tagsJson: JSON.stringify(course.tags),
        searchText: [course.title, course.category, course.duration, course.visual, ...course.tags].join(' ').toLowerCase(),
      },
      create: {
        slug: course.slug,
        title: course.title,
        category: course.category,
        duration: course.duration,
        rating: course.rating,
        price: course.price,
        visual: course.visual,
        best_sellers: course.best_sellers,
        tagsJson: JSON.stringify(course.tags),
        searchText: [course.title, course.category, course.duration, course.visual, ...course.tags].join(' ').toLowerCase(),
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
