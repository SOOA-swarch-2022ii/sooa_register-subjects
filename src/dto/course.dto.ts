import { ScheduleDto } from './schedule.dto';
import { StudentRecordDto } from './student-record.dto';

export class CourseDto {
  id?: string;
  academic_semester: string;
  end_date: string;
  group_number: number;
  places: number;
  professors: string[];
  schedule: ScheduleDto[];
  start_date: string;
  students_record: StudentRecordDto[];
  subject: string;
}
