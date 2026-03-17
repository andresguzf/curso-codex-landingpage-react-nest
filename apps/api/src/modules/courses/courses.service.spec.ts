import { NotFoundException } from '@nestjs/common';
import type { Course } from '@prisma/client';
import { CoursesService } from './courses.service';

function createCourseRecord(overrides: Partial<Course> = {}): Course {
  return {
    id: 1,
    slug: 'curso-prueba',
    title: 'Curso backend moderno',
    category: 'Backend',
    description: 'Descripcion de prueba para el curso.',
    image_url: null,
    hours: 12.5,
    rating: 4.8,
    price: 59.9,
    best_sellers: false,
    tagsJson: JSON.stringify(['nestjs', 'api']),
    created_at: new Date('2026-03-14T00:00:00.000Z'),
    updated_at: new Date('2026-03-14T00:00:00.000Z'),
    ...overrides,
  };
}

describe('CoursesService', () => {
  it('findAll builds the expected Prisma filter and maps records', async () => {
    const findMany = jest.fn().mockResolvedValue([
      createCourseRecord(),
    ]);
    const prisma = {
      course: {
        findMany,
      },
    };

    const service = new CoursesService(prisma as never);
    const result = await service.findAll({ query: ' React ', tag: ' frontend ' });

    expect(findMany).toHaveBeenCalledWith({
      where: {
        title: { contains: 'react' },
        tagsJson: { contains: '"frontend"' },
      },
      orderBy: [{ id: 'desc' }, { title: 'asc' }],
    });
    expect(result[0]).toMatchObject({
      id: 1,
      title: 'Curso backend moderno',
      tags: ['nestjs', 'api'],
    });
  });

  it('findPaginated returns items and pagination metadata', async () => {
    const findMany = jest.fn().mockResolvedValue([
      createCourseRecord({ id: 8, title: 'Curso paginado 8' }),
      createCourseRecord({ id: 7, title: 'Curso paginado 7', slug: 'curso-paginado-7' }),
    ]);
    const count = jest.fn().mockResolvedValue(12);
    const prisma = {
      course: {
        findMany,
        count,
      },
      $transaction: jest.fn().mockImplementation(async (operations) => Promise.all(operations)),
    };

    const service = new CoursesService(prisma as never);
    const result = await service.findPaginated({ page: 2, limit: 2, query: ' Curso ', tag: ' backend ' });

    expect(count).toHaveBeenCalledWith({
      where: {
        title: { contains: 'curso' },
        tagsJson: { contains: '"backend"' },
      },
    });
    expect(findMany).toHaveBeenCalledWith({
      where: {
        title: { contains: 'curso' },
        tagsJson: { contains: '"backend"' },
      },
      orderBy: [{ id: 'desc' }, { title: 'asc' }],
      skip: 2,
      take: 2,
    });
    expect(result.pagination).toEqual({
      page: 2,
      limit: 2,
      total: 12,
      totalPages: 6,
      hasNextPage: true,
      hasPreviousPage: true,
    });
    expect(result.items).toHaveLength(2);
  });

  it('update throws when the course does not exist', async () => {
    const prisma = {
      course: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    const service = new CoursesService(prisma as never);

    await expect(service.update(999, { title: 'Curso backend modernizado' })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove deletes an existing course', async () => {
    const deleteFn = jest.fn().mockResolvedValue(undefined);
    const prisma = {
      course: {
        findUnique: jest.fn().mockResolvedValue({ id: 3 }),
        delete: deleteFn,
      },
    };

    const service = new CoursesService(prisma as never);
    await service.remove(3);

    expect(deleteFn).toHaveBeenCalledWith({
      where: { id: 3 },
    });
  });
});
