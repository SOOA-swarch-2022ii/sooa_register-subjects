import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ScheduleDto } from '../dto/schedule.dto';
import { StudentRecordDto } from '../dto/student-record.dto';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  academic_semester: string;

  @Prop()
  end_date: string;

  @Prop()
  group_number: number;

  @Prop()
  places: number;

  @Prop()
  professors: string[];

  @Prop()
  schedule: ScheduleDto[];

  @Prop()
  start_date: string;

  @Prop()
  students_record: StudentRecordDto[];

  @Prop()
  subject: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
