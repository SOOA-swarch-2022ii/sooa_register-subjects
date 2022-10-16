import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/interceptor';
import { RegisterSubjectService } from '../services/register-subject.service';
import { RegisterCourseDto } from '../dto/register-course.dto';
import { plainToInstance } from 'class-transformer';

@Controller('register-subject')
@UseInterceptors(BusinessErrorsInterceptor)
export class RegisterSubjectController {
  constructor(
    private readonly registerSubjectService: RegisterSubjectService,
  ) {}

  @Post()
  async registerCourse(@Body() registerCourseDto: RegisterCourseDto) {
    return await this.registerSubjectService.registerCourse(registerCourseDto);
  }

  @Get('course/:course_id')
  async findOneCourse(@Param('course_id') course_id: string) {
    return await this.registerSubjectService.findOneCourse(course_id);
  }

  @Get('student/:student_id')
  async findOneStudent(@Param('student_id') student_id: string) {
    return await this.registerSubjectService.findOneStudent(student_id);
  }

  //@Delete(':student_id/:course_id')
  @Get('delete/:student_id/:course_id')
  async unregisterCourse(
    @Param('student_id') student_id: string,
    @Param('course_id') course_id: string,
  ) {
    const registerCourseDto: RegisterCourseDto = plainToInstance(
      RegisterCourseDto,
      { student_id, course_id },
    );
    return await this.registerSubjectService.unregisterCourse(
      registerCourseDto,
    );
  }
}
