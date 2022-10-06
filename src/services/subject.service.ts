import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../schemas/subject.schema';
import { SubjectDto } from '../dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly model: Model<SubjectDocument>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Subject> {
    return await this.model.findById(id).exec();
  }

  async create(createSubjectDto: SubjectDto): Promise<Subject> {
    return await new this.model({
      ...createSubjectDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateSubjectDto: SubjectDto): Promise<Subject> {
    return await this.model.findByIdAndUpdate(id, updateSubjectDto).exec();
  }

  async delete(id: string): Promise<Subject> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async findOneByCode(code: string): Promise<Subject> {
    return await this.model.findOne({ code: { $eq: code } }).exec();
  }
}
