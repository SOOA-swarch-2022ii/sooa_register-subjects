import { SubjectService } from "./subject.service";
import { CourseService } from "./course.service";
import { RegisterCourseDto } from "../dto/register-course.dto";
import { Course } from "../schemas/course.schema";
export declare class RegisterSubjectService {
    private readonly subjectService;
    private readonly courseService;
    constructor(subjectService: SubjectService, courseService: CourseService);
    registerCourse(data: RegisterCourseDto): Promise<Course>;
    findOneCourse(course_id: string): Promise<Course>;
    findOneStudent(student_id: string): Promise<any>;
    unregisterCourse(data: RegisterCourseDto): Promise<Course>;
}
