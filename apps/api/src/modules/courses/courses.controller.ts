import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import { CoursesService } from './courses.service';
import {
  courseParamsSchema,
  coursesQuerySchema,
  createCourseSchema,
  latestCoursesQuerySchema,
  type CourseParamsDto,
  type CoursesQueryDto,
  type CreateCourseDto,
  type LatestCoursesQueryDto,
} from './courses.schemas';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@Query(new ZodValidationPipe(coursesQuerySchema)) query: CoursesQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get('latest')
  findLatest(@Query(new ZodValidationPipe(latestCoursesQuerySchema)) query: LatestCoursesQueryDto) {
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
  findOne(@Param(new ZodValidationPipe(courseParamsSchema)) params: CourseParamsDto) {
    return this.coursesService.findOne(params.id);
  }

  @Post()
  create(@Body(new ZodValidationPipe(createCourseSchema)) body: CreateCourseDto) {
    return this.coursesService.create(body);
  }
}
