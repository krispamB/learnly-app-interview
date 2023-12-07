import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from '@prisma/client';
import { ApiResponse } from 'src/common/types';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  logger = new Logger(TaskService.name);

  async createTask(userId: string, dto: CreateTaskDto): Promise<ApiResponse> {
    try {
      this.logger.log('Creating task...');
      const newTask: Task = await this.prisma.task.create({
        data: {
          task_name: dto.task_name,
          description: dto.description,
          due_date: new Date(dto.due_date),
          user_id: userId,
        },
      });

      return {
        status: 201,
        message: 'Task created successfully',
        data: newTask,
      };
    } catch (error) {
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new BadGatewayException('An error ocurred while creating task');
    }
  }

  async getTaskById(taskId: string): Promise<ApiResponse> {
    try {
      this.logger.log('Finding task in database');
      const task: Task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) throw new NotFoundException('Task not found');

      return {
        status: 200,
        message: 'Task found',
        data: task,
      };
    } catch (error) {
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new InternalServerErrorException(
        'An error ocurred while retrieving task',
      );
    }
  }

  async getUserTasks(userId: string): Promise<ApiResponse> {
    try {
      const tasks: Task[] = await this.prisma.task.findMany({
        where: { user_id: userId },
      });

      return {
        status: 200,
        message: 'Tasks found',
        data: tasks,
      };
    } catch (error) {
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new InternalServerErrorException(
        'An error ocurred while retrieving tasks',
      );
    }
  }

  async getAllTasks(): Promise<ApiResponse> {
    try {
      const tasks: Task[] = await this.prisma.task.findMany({});

      return {
        status: 200,
        message: 'All tasks in database',
        data: tasks,
      };
    } catch (error) {
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new InternalServerErrorException(
        'An error ocurred while retrieving tasks',
      );
    }
  }

  async updateTask(
    userId: string,
    taskId: string,
    dto: UpdateTaskDto,
  ): Promise<ApiResponse> {
    let ISOdate: Date;
    if (dto.due_date) {
      ISOdate = new Date(dto.due_date);
    }
    try {
      const task: Task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) throw new NotFoundException('Tak not found');
      if (task.user_id !== userId)
        throw new UnauthorizedException('You are not authorized to edit');

      const newTask: Task = await this.prisma.task.update({
        where: { id: taskId },
        data: { ...dto, due_date: ISOdate },
      });

      return {
        status: 200,
        message: 'Task updated successfully',
        data: newTask,
      };
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new InternalServerErrorException(
        'An error ocurred while updating the task',
      );
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<ApiResponse> {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: { id: taskId, user_id: userId },
      });

      if (!deletedTask)
        throw new UnauthorizedException(
          'You are not authorized to delete this task',
        );

      return {
        status: 200,
        message: 'Task deleted successfully',
        data: {
          success: true,
        },
      };
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Error creating task ${JSON.stringify(error, null, 2)}`,
      );
      throw new InternalServerErrorException(
        'An error ocurred while updating the task',
      );
    }
  }
}
