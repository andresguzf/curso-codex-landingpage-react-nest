import { Injectable, NotFoundException } from '@nestjs/common';
import type { Course } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { CoursesQueryDto, CreateCourseDto, CourseDto } from './courses.schemas';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: CoursesQueryDto = {}): Promise<CourseDto[]> {
    const normalizedQuery = filters.query?.trim().toLowerCase();
    const normalizedTag = filters.tag?.trim().toLowerCase();
    const courses = await this.prisma.course.findMany({
      where: {
        ...(normalizedQuery ? { searchText: { contains: normalizedQuery } } : {}),
        ...(normalizedTag ? { tagsJson: { contains: `"${normalizedTag}"` } } : {}),
      },
      orderBy: [
        { id: 'desc' },
        { title: 'asc' },
      ],
    });

    return courses.map(mapCourseRecord);
  }

  async findLatest(limit = 3): Promise<CourseDto[]> {
    const courses = await this.prisma.course.findMany({
      orderBy: [
        { id: 'desc' },
      ],
      take: limit,
    });

    return courses.map(mapCourseRecord);
  }

  async findTags(): Promise<string[]> {
    const courses = await this.prisma.course.findMany({
      select: { tagsJson: true },
    });

    return Array.from(
      new Set(
        courses.flatMap((course) => JSON.parse(course.tagsJson) as string[]),
      ),
    ).sort((left, right) => left.localeCompare(right, 'es'));
  }

  async countAll(): Promise<{ total: number }> {
    const total = await this.prisma.course.count();
    return { total };
  }

  async findOne(id: number): Promise<CourseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return mapCourseRecord(course);
  }

  async create(input: CreateCourseDto): Promise<CourseDto> {
    const course = await this.prisma.course.upsert({
      where: { slug: input.slug },
      update: {
        slug: input.slug,
        title: input.title,
        category: input.category,
        duration: input.duration,
        rating: input.rating,
        price: input.price,
        visual: input.visual,
        best_sellers: input.best_sellers,
        tagsJson: JSON.stringify(input.tags),
        searchText: buildSearchText(input),
      },
      create: {
        slug: input.slug,
        title: input.title,
        category: input.category,
        duration: input.duration,
        rating: input.rating,
        price: input.price,
        visual: input.visual,
        best_sellers: input.best_sellers,
        tagsJson: JSON.stringify(input.tags),
        searchText: buildSearchText(input),
      },
    });

    return mapCourseRecord(course);
  }
}

function buildSearchText(course: CreateCourseDto): string {
  return [course.title, course.category, course.duration, course.visual, ...course.tags]
    .join(' ')
    .toLowerCase();
}

function mapCourseRecord(course: Course): CourseDto {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    duration: course.duration,
    rating: course.rating,
    price: course.price,
    visual: course.visual,
    best_sellers: course.best_sellers,
    tags: JSON.parse(course.tagsJson) as string[],
  };
}
