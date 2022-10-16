"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSubjectModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const subject_schema_1 = require("../schemas/subject.schema");
const register_subject_service_1 = require("../services/register-subject.service");
const register_subject_controller_1 = require("../controllers/register-subject.controller");
const course_schema_1 = require("../schemas/course.schema");
const subject_service_1 = require("../services/subject.service");
const course_service_1 = require("../services/course.service");
let RegisterSubjectModule = class RegisterSubjectModule {
};
RegisterSubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([
                { name: subject_schema_1.Subject.name, schema: subject_schema_1.SubjectSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
            ]),
        ],
        providers: [register_subject_service_1.RegisterSubjectService, subject_service_1.SubjectService, course_service_1.CourseService],
        controllers: [register_subject_controller_1.RegisterSubjectController],
    })
], RegisterSubjectModule);
exports.RegisterSubjectModule = RegisterSubjectModule;
//# sourceMappingURL=register-subject.module.js.map