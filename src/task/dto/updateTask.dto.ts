import { Status } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  task_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  due_date: string;

  @IsEnum(Status)
  status: Status;
}
