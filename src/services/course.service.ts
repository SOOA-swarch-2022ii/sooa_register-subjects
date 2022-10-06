import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { CourseDto } from '../dto/course.dto';
import { RegisterCourseDto } from '../dto/register-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly model: Model<CourseDocument>,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    return await this.model.findById(id).exec();
  }

  async create(createCourseDto: CourseDto): Promise<Course> {
    return await new this.model({
      ...createCourseDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateCourseDto: CourseDto): Promise<Course> {
    return await this.model.findByIdAndUpdate(id, updateCourseDto).exec();
  }

  async delete(id: string): Promise<Course> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async courseExists(data: RegisterCourseDto): Promise<boolean> {
    let courseExists = null;
    try {
      courseExists = await this.model.findById(data.course_id).exec();
    } catch (e) {}
    return courseExists !== null;
  }

  async studentIsRegistered(data: RegisterCourseDto): Promise<boolean> {
    const course = await this.model.findById(data.course_id).exec();
    return (
      course.students_record.filter((item) => item.student === data.student_id)
        .length > 0
    );
  }

  async courseHasPlaces(data: RegisterCourseDto): Promise<boolean> {
    const course = await this.model.findById(data.course_id).exec();
    const placesAvailable = course.places - course.students_record.length;
    return placesAvailable > 0;
  }

  async hasScheduleAvailable(data: RegisterCourseDto): Promise<boolean> {
    const course = await this.model.findById(data.course_id).exec();
    const courses = await this.model.find().exec();
    const studentCourses = courses
      .filter(
        (item) =>
          item.students_record.filter(
            (item) => item.student === data.student_id,
          ).length > 0,
      )
      .map((item) => item.schedule)
      .reduce((beforeValue, _value) => {
        beforeValue.push(..._value);
        return beforeValue;
      }, []);

    const schedulesNotAvailable = course.schedule.filter((schedule) => {
      return studentCourses.some(
        (item) =>
          item.day === schedule.day &&
          item.start_h === schedule.start_h &&
          item.end_h === schedule.end_h,
      );
    });
    return schedulesNotAvailable.length === 0;
  }

  async studentCourses(student_id: string): Promise<Course[]> {
    const courses = await this.model.find().exec();
    return courses.filter(
      (item) =>
        item.students_record.filter((item) => item.student === student_id)
          .length > 0,
    );
  }

  async registerCourse(data: RegisterCourseDto): Promise<Course> {
    const course = await this.model.findById(data.course_id).exec();
    course.students_record.push({ student: data.student_id, grades: [] });
    return this.update(data.course_id, course);
  }

  async unregisterCourse(data: RegisterCourseDto): Promise<Course> {
    const course = await this.model.findById(data.course_id).exec();
    course.students_record = course.students_record.filter(
      (item) => item.student !== data.student_id,
    );
    return this.update(data.course_id, course);
  }
}
