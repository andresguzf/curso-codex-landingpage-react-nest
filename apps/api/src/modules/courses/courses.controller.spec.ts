import { CoursesController } from './courses.controller';
import type { CourseDto, CreateCourseDto, UpdateCourseDto } from './courses.schemas';

const courseDto: CourseDto = {
  id: 1,
  slug: 'curso-prueba',
  title: 'Curso backend moderno',
  category: 'Backend',
  description: 'Descripcion de prueba para el curso.',
  hours: 12.5,
  rating: 4.8,
  price: 59.9,
  best_sellers: false,
  tags: ['nestjs'],
  created_at: '2026-03-14T00:00:00.000Z',
  updated_at: '2026-03-14T00:00:00.000Z',
};

describe('CoursesController', () => {
  it('findAll delegates to the service', async () => {
    const coursesService = {
      findAll: jest.fn().mockResolvedValue([courseDto]),
    };
    const controller = new CoursesController(coursesService as never);

    const result = await controller.findAll({ query: 'react', tag: 'frontend' });

    expect(coursesService.findAll).toHaveBeenCalledWith({ query: 'react', tag: 'frontend' });
    expect(result).toEqual([courseDto]);
  });

  it('findPaginated delegates to the service', async () => {
    const paginatedResponse = {
      items: [courseDto],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
    const coursesService = {
      findPaginated: jest.fn().mockResolvedValue(paginatedResponse),
    };
    const controller = new CoursesController(coursesService as never);

    const result = await controller.findPaginated({ page: 1, limit: 10, query: 'react', tag: 'frontend' });

    expect(coursesService.findPaginated).toHaveBeenCalledWith({ page: 1, limit: 10, query: 'react', tag: 'frontend' });
    expect(result).toEqual(paginatedResponse);
  });

  it('create delegates to the service', async () => {
    const coursesService = {
      create: jest.fn().mockResolvedValue(courseDto),
    };
    const controller = new CoursesController(coursesService as never);
    const body: CreateCourseDto = {
      slug: 'curso-prueba',
      title: 'Curso backend moderno',
      category: 'Backend',
      description: 'Descripcion de prueba para el curso.',
      hours: 12.5,
      rating: 4.8,
      price: 59.9,
      best_sellers: false,
      tags: ['nestjs'],
    };

    const result = await controller.create(body);

    expect(coursesService.create).toHaveBeenCalledWith(body);
    expect(result).toEqual(courseDto);
  });

  it('update delegates to the service with params and body', async () => {
    const coursesService = {
      update: jest.fn().mockResolvedValue(courseDto),
    };
    const controller = new CoursesController(coursesService as never);
    const body: UpdateCourseDto = {
      title: 'Curso backend actualizado',
    };

    const result = await controller.update({ id: 1 }, body);

    expect(coursesService.update).toHaveBeenCalledWith(1, body);
    expect(result).toEqual(courseDto);
  });
});
