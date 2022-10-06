import { Injectable } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CourseService } from "./course.service";
import { RegisterCourseDto } from "../dto/register-course.dto";
import { BusinessError, BusinessLogicException } from "../shared/errors/business-errors";
import { Course } from "../schemas/course.schema";

@Injectable()
export class RegisterSubjectService {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly courseService: CourseService,
  ) {}

  async registerCourse(data: RegisterCourseDto): Promise<Course> {
    const courseExists = await this.courseService.courseExists(data);
    if (!courseExists) {
      throw new BusinessLogicException(
        'The course not exists',
        BusinessError.BAD_REQUEST,
      );
    }

    const studentIsRegistered = await this.courseService.studentIsRegistered(
      data,
    );
    if (studentIsRegistered) {
      throw new BusinessLogicException(
        'The student is already register in the course',
        BusinessError.BAD_REQUEST,
      );
    }

    const courseHasPlaces = await this.courseService.courseHasPlaces(data);
    if (!courseHasPlaces) {
      throw new BusinessLogicException(
        'The course has not places',
        BusinessError.BAD_REQUEST,
      );
    }

    const hasScheduleAvailable = await this.courseService.hasScheduleAvailable(
      data,
    );
    if (!hasScheduleAvailable) {
      throw new BusinessLogicException(
        'The schedule subject can not be placed',
        BusinessError.BAD_REQUEST,
      );
    }

    await this.courseService.registerCourse(data);

    return await this.courseService.findOne(data.course_id);
  }

  async findOneCourse(course_id: string): Promise<Course> {
    return await this.courseService.findOne(course_id);
  }

  async findOneStudent(student_id: string): Promise<any> {
    const courses = await this.courseService.studentCourses(student_id);
    const coursesWithSubject = [];
    for (const course of courses) {
      const subject = await this.subjectService.findOneByCode(course.subject);
      coursesWithSubject.push({ course, subject });
    }
    return coursesWithSubject;
  }

  async unregisterCourse(data: RegisterCourseDto): Promise<Course> {
    const courseExists = await this.courseService.courseExists(data);
    if (!courseExists) {
      throw new BusinessLogicException(
        'The course not exists',
        BusinessError.BAD_REQUEST,
      );
    }

    const studentIsRegistered = await this.courseService.studentIsRegistered(
      data,
    );
    if (!studentIsRegistered) {
      throw new BusinessLogicException(
        'The student is not register in the course',
        BusinessError.BAD_REQUEST,
      );
    }

    await this.courseService.unregisterCourse(data);

    return await this.courseService.findOne(data.course_id);
  }
}
