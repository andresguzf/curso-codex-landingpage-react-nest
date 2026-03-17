import { Injectable, NotFoundException } from '@nestjs/common';
import type { Course } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type {
  CoursesQueryDto,
  CreateCourseDto,
  CourseDto,
  PaginatedCoursesDto,
  PaginatedCoursesQueryDto,
  UpdateCourseDto,
} from './courses.schemas';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: CoursesQueryDto = {}): Promise<CourseDto[]> {
    const where = buildCourseWhere(filters);
    const courses = await this.prisma.course.findMany({
      where,
      orderBy: [
        { id: 'desc' },
        { title: 'asc' },
      ],
    });

    return courses.map(mapCourseRecord);
  }

  async findPaginated(filters: PaginatedCoursesQueryDto): Promise<PaginatedCoursesDto> {
    const where = buildCourseWhere(filters);
    const page = filters.page;
    const limit = filters.limit;
    const skip = (page - 1) * limit;

    const [total, courses] = await this.prisma.$transaction([
      this.prisma.course.count({ where }),
      this.prisma.course.findMany({
        where,
        orderBy: [
          { id: 'desc' },
          { title: 'asc' },
        ],
        skip,
        take: limit,
      }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: courses.map(mapCourseRecord),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1 && totalPages > 0,
      },
    };
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
        description: input.description,
        image_url: input.image_url ?? null,
        hours: input.hours,
        rating: input.rating,
        price: input.price,
        best_sellers: input.best_sellers,
        tagsJson: JSON.stringify(input.tags),
      },
      create: {
        slug: input.slug,
        title: input.title,
        category: input.category,
        description: input.description,
        image_url: input.image_url ?? null,
        hours: input.hours,
        rating: input.rating,
        price: input.price,
        best_sellers: input.best_sellers,
        tagsJson: JSON.stringify(input.tags),
      },
    });

    return mapCourseRecord(course);
  }

  async update(id: number, input: UpdateCourseDto): Promise<CourseDto> {
    const existingCourse = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    const nextCourse = {
      slug: input.slug ?? existingCourse.slug,
      title: input.title ?? existingCourse.title,
      category: input.category ?? existingCourse.category,
      description: input.description ?? existingCourse.description,
      image_url: input.image_url === undefined ? existingCourse.image_url : input.image_url,
      hours: input.hours ?? existingCourse.hours,
      rating: input.rating ?? existingCourse.rating,
      price: input.price ?? existingCourse.price,
      best_sellers: input.best_sellers ?? existingCourse.best_sellers,
      tags: input.tags ?? (JSON.parse(existingCourse.tagsJson) as string[]),
    };

    const course = await this.prisma.course.update({
      where: { id },
      data: {
        slug: nextCourse.slug,
        title: nextCourse.title,
        category: nextCourse.category,
        description: nextCourse.description,
        image_url: nextCourse.image_url,
        hours: nextCourse.hours,
        rating: nextCourse.rating,
        price: nextCourse.price,
        best_sellers: nextCourse.best_sellers,
        tagsJson: JSON.stringify(nextCourse.tags),
      },
    });

    return mapCourseRecord(course);
  }

  async remove(id: number): Promise<void> {
    const existingCourse = await this.prisma.course.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingCourse) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    await this.prisma.course.delete({
      where: { id },
    });
  }
}

function buildCourseWhere(filters: Pick<CoursesQueryDto, 'query' | 'tag'>) {
  const normalizedQuery = filters.query?.trim().toLowerCase();
  const normalizedTag = filters.tag?.trim().toLowerCase();

  return {
    ...(normalizedQuery ? { title: { contains: normalizedQuery } } : {}),
    ...(normalizedTag ? { tagsJson: { contains: `"${normalizedTag}"` } } : {}),
  };
}

function mapCourseRecord(course: Course): CourseDto {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    description: course.description,
    image_url: course.image_url,
    hours: course.hours,
    rating: course.rating,
    price: course.price,
    best_sellers: course.best_sellers,
    tags: JSON.parse(course.tagsJson) as string[],
    created_at: course.created_at.toISOString(),
    updated_at: course.updated_at.toISOString(),
  };
}
