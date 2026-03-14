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
