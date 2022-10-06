import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  academic_level: string;

  @Prop()
  basic_academic_unit: string;

  @Prop()
  faculty: string;

  @Prop()
  level: string;

  @Prop()
  vigency: boolean;

  @Prop()
  campus: string;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  content: string[];

  @Prop()
  credits: number;

  @Prop()
  department: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
