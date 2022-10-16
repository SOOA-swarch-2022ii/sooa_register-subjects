import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../schemas/subject.schema';
import { SubjectDto } from '../dto/subject.dto';
export declare class SubjectService {
    private readonly model;
    constructor(model: Model<SubjectDocument>);
    findAll(): Promise<Subject[]>;
    findOne(id: string): Promise<Subject>;
    create(createSubjectDto: SubjectDto): Promise<Subject>;
    update(id: string, updateSubjectDto: SubjectDto): Promise<Subject>;
    delete(id: string): Promise<Subject>;
    findOneByCode(code: string): Promise<Subject>;
}
