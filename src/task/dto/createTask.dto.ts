import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  task_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  due_date: string;
}
