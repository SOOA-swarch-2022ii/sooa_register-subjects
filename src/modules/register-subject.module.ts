import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from '../schemas/subject.schema';
import { RegisterSubjectService } from '../services/register-subject.service';
import { RegisterSubjectController } from '../controllers/register-subject.controller';
import { Course, CourseSchema } from '../schemas/course.schema';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  providers: [RegisterSubjectService, SubjectService, CourseService],
  controllers: [RegisterSubjectController],
})
export class RegisterSubjectModule {}
