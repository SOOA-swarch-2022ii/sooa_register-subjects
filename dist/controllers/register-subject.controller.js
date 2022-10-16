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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSubjectController = void 0;
const common_1 = require("@nestjs/common");
const interceptor_1 = require("../shared/interceptors/interceptor");
const register_subject_service_1 = require("../services/register-subject.service");
const register_course_dto_1 = require("../dto/register-course.dto");
const class_transformer_1 = require("class-transformer");
let RegisterSubjectController = class RegisterSubjectController {
    constructor(registerSubjectService) {
        this.registerSubjectService = registerSubjectService;
    }
    async registerCourse(registerCourseDto) {
        return await this.registerSubjectService.registerCourse(registerCourseDto);
    }
    async findOneCourse(course_id) {
        return await this.registerSubjectService.findOneCourse(course_id);
    }
    async findOneStudent(student_id) {
        return await this.registerSubjectService.findOneStudent(student_id);
    }
    async unregisterCourse(student_id, course_id) {
        const registerCourseDto = (0, class_transformer_1.plainToInstance)(register_course_dto_1.RegisterCourseDto, { student_id, course_id });
        return await this.registerSubjectService.unregisterCourse(registerCourseDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_course_dto_1.RegisterCourseDto]),
    __metadata("design:returntype", Promise)
], RegisterSubjectController.prototype, "registerCourse", null);
__decorate([
    (0, common_1.Get)('course/:course_id'),
    __param(0, (0, common_1.Param)('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterSubjectController.prototype, "findOneCourse", null);
__decorate([
    (0, common_1.Get)('student/:student_id'),
    __param(0, (0, common_1.Param)('student_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterSubjectController.prototype, "findOneStudent", null);
__decorate([
    (0, common_1.Get)('delete/:student_id/:course_id'),
    __param(0, (0, common_1.Param)('student_id')),
    __param(1, (0, common_1.Param)('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RegisterSubjectController.prototype, "unregisterCourse", null);
RegisterSubjectController = __decorate([
    (0, common_1.Controller)('register-subject'),
    (0, common_1.UseInterceptors)(interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [register_subject_service_1.RegisterSubjectService])
], RegisterSubjectController);
exports.RegisterSubjectController = RegisterSubjectController;
//# sourceMappingURL=register-subject.controller.js.map