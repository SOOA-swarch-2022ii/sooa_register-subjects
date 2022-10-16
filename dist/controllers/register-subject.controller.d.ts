import { RegisterSubjectService } from '../services/register-subject.service';
import { RegisterCourseDto } from '../dto/register-course.dto';
export declare class RegisterSubjectController {
    private readonly registerSubjectService;
    constructor(registerSubjectService: RegisterSubjectService);
    registerCourse(registerCourseDto: RegisterCourseDto): Promise<import("../schemas/course.schema").Course>;
    findOneCourse(course_id: string): Promise<import("../schemas/course.schema").Course>;
    findOneStudent(student_id: string): Promise<any>;
    unregisterCourse(student_id: string, course_id: string): Promise<import("../schemas/course.schema").Course>;
}
