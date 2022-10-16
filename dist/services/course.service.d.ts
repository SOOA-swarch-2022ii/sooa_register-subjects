import { Model } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { CourseDto } from '../dto/course.dto';
import { RegisterCourseDto } from '../dto/register-course.dto';
export declare class CourseService {
    private readonly model;
    constructor(model: Model<CourseDocument>);
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    create(createCourseDto: CourseDto): Promise<Course>;
    update(id: string, updateCourseDto: CourseDto): Promise<Course>;
    delete(id: string): Promise<Course>;
    courseExists(data: RegisterCourseDto): Promise<boolean>;
    courseExistsDataBase(data: String): Promise<boolean>;
    studentIsRegistered(data: RegisterCourseDto): Promise<boolean>;
    courseHasPlaces(data: RegisterCourseDto): Promise<boolean>;
    hasScheduleAvailable(data: RegisterCourseDto): Promise<boolean>;
    studentCourses(student_id: string): Promise<Course[]>;
    registerCourse(data: RegisterCourseDto): Promise<Course>;
    unregisterCourse(data: RegisterCourseDto): Promise<Course>;
}
