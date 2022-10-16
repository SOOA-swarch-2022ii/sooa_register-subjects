"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSubjectService = void 0;
const common_1 = require("@nestjs/common");
const subject_service_1 = require("./subject.service");
const course_service_1 = require("./course.service");
const business_errors_1 = require("../shared/errors/business-errors");
let RegisterSubjectService = class RegisterSubjectService {
    constructor(subjectService, courseService) {
        this.subjectService = subjectService;
        this.courseService = courseService;
    }
    async registerCourse(data) {
        const courseExists = await this.courseService.courseExists(data);
        if (!courseExists) {
            throw new business_errors_1.BusinessLogicException('The course not exists', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const studentIsRegistered = await this.courseService.studentIsRegistered(data);
        if (studentIsRegistered) {
            throw new business_errors_1.BusinessLogicException('The student is already register in the course', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const courseHasPlaces = await this.courseService.courseHasPlaces(data);
        if (!courseHasPlaces) {
            throw new business_errors_1.BusinessLogicException('The course has not places', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const hasScheduleAvailable = await this.courseService.hasScheduleAvailable(data);
        if (!hasScheduleAvailable) {
            throw new business_errors_1.BusinessLogicException('The schedule subject can not be placed', business_errors_1.BusinessError.BAD_REQUEST);
        }
        await this.courseService.registerCourse(data);
        return await this.courseService.findOne(data.course_id);
    }
    async findOneCourse(course_id) {
        return await this.courseService.findOne(course_id);
    }
    async findOneStudent(student_id) {
        const courses = await this.courseService.studentCourses(student_id);
        const coursesWithSubject = [];
        for (const course of courses) {
            const subject = await this.subjectService.findOneByCode(course.subject);
            coursesWithSubject.push({ course, subject });
        }
        return coursesWithSubject;
    }
    async unregisterCourse(data) {
        const courseExists = await this.courseService.courseExists(data);
        if (!courseExists) {
            throw new business_errors_1.BusinessLogicException('The course not exists', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const studentIsRegistered = await this.courseService.studentIsRegistered(data);
        if (!studentIsRegistered) {
            throw new business_errors_1.BusinessLogicException('The student is not register in the course', business_errors_1.BusinessError.BAD_REQUEST);
        }
        await this.courseService.unregisterCourse(data);
        return await this.courseService.findOne(data.course_id);
    }
};
RegisterSubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subject_service_1.SubjectService,
        course_service_1.CourseService])
], RegisterSubjectService);
exports.RegisterSubjectService = RegisterSubjectService;
//# sourceMappingURL=register-subject.service.js.map