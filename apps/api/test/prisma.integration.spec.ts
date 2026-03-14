import { PrismaService } from '../src/prisma/prisma.service';

describe('PrismaService integration', () => {
  const prisma = new PrismaService();

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('reads seeded courses and users from SQLite test database', async () => {
    const [coursesCount, usersCount] = await Promise.all([
      prisma.course.count(),
      prisma.user.count(),
    ]);

    expect(coursesCount).toBeGreaterThan(0);
    expect(usersCount).toBeGreaterThan(0);
  });

  it('can persist and read back a course directly through Prisma', async () => {
    const slug = 'curso-prisma-integracion';

    await prisma.course.create({
      data: {
        slug,
        title: 'Curso prisma integracion',
        category: 'Backend',
        description: 'Prueba de integracion con Prisma y SQLite.',
        hours: 8.5,
        rating: 4.5,
        price: 45,
        best_sellers: false,
        tagsJson: JSON.stringify(['prisma', 'sqlite']),
      },
    });

    const stored = await prisma.course.findUnique({
      where: { slug },
    });

    expect(stored).not.toBeNull();
    expect(stored?.title).toBe('Curso prisma integracion');

    await prisma.course.delete({
      where: { slug },
    });
  });
});
