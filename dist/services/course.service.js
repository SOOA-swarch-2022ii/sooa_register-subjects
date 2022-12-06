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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("../schemas/course.schema");
let CourseService = class CourseService {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return await this.model.find().exec();
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(createCourseDto) {
        return await new this.model(Object.assign(Object.assign({}, createCourseDto), { createdAt: new Date() })).save();
    }
    async update(id, updateCourseDto) {
        return await this.model.findByIdAndUpdate(id, updateCourseDto).exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async courseExists(data) {
        let courseExists = null;
        try {
            courseExists = await this.model.findById(data.course_id).exec();
        }
        catch (e) { }
        return courseExists !== null;
    }
    async studentIsRegistered(data) {
        const course = await this.model.findById(data.course_id).exec();
        return (course.students_record.filter((item) => item.student === data.student_id)
            .length > 0);
    }
    async courseHasPlaces(data) {
        const course = await this.model.findById(data.course_id).exec();
        const placesAvailable = course.places - course.students_record.length;
        return placesAvailable > 0;
    }
    async hasScheduleAvailable(data) {
        const course = await this.model.findById(data.course_id).exec();
        const courses = await this.model.find().exec();
        const studentCourses = courses
            .filter((item) => item.students_record.filter((item) => item.student === data.student_id).length > 0)
            .map((item) => item.schedule)
            .reduce((beforeValue, _value) => {
            beforeValue.push(..._value);
            return beforeValue;
        }, []);
        const schedulesNotAvailable = course.schedule.filter((schedule) => {
            return studentCourses.some((item) => item.day === schedule.day &&
                item.start_h === schedule.start_h &&
                item.end_h === schedule.end_h);
        });
        return schedulesNotAvailable.length === 0;
    }
    async studentCourses(student_id) {
        const courses = await this.model.find().exec();
        return courses.filter((item) => item.students_record.filter((item) => item.student === student_id)
            .length > 0);
    }
    async registerCourse(data) {
        const course = await this.model.findById(data.course_id).exec();
        course.students_record.push({ student: data.student_id, grades: [] });
        return this.update(data.course_id, course);
    }
    async unregisterCourse(data) {
        const course = await this.model.findById(data.course_id).exec();
        course.students_record = course.students_record.filter((item) => item.student !== data.student_id);
        return this.update(data.course_id, course);
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map