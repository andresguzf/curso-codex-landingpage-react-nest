import { Controller, Delete, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { ZodBody, ZodParam, ZodQuery } from '../../common/zod.decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CoursesService } from './courses.service';
import {
  courseParamsSchema,
  coursesQuerySchema,
  createCourseSchema,
  latestCoursesQuerySchema,
  paginatedCoursesQuerySchema,
  updateCourseSchema,
  type CourseParamsDto,
  type CoursesQueryDto,
  type CreateCourseDto,
  type LatestCoursesQueryDto,
  type PaginatedCoursesQueryDto,
  type UpdateCourseDto,
} from './courses.schemas';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@ZodQuery(coursesQuerySchema) query: CoursesQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get('paginated')
  findPaginated(@ZodQuery(paginatedCoursesQuerySchema) query: PaginatedCoursesQueryDto) {
    return this.coursesService.findPaginated(query);
  }

  @Get('latest')
  findLatest(@ZodQuery(latestCoursesQuerySchema) query: LatestCoursesQueryDto) {
    return this.coursesService.findLatest(query.limit ?? 3);
  }

  @Get('tags')
  findTags() {
    return this.coursesService.findTags();
  }

  @Get('count')
  findCount() {
    return this.coursesService.countAll();
  }

  @Get(':id')
  findOne(@ZodParam(courseParamsSchema) params: CourseParamsDto) {
    return this.coursesService.findOne(params.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@ZodBody(createCourseSchema) body: CreateCourseDto) {
    return this.coursesService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @ZodParam(courseParamsSchema) params: CourseParamsDto,
    @ZodBody(updateCourseSchema) body: UpdateCourseDto,
  ) {
    return this.coursesService.update(params.id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(@ZodParam(courseParamsSchema) params: CourseParamsDto) {
    await this.coursesService.remove(params.id);
  }
}
