import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { GetUser } from 'src/common/decorator';
import { JwtGuard } from 'src/common/Guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@GetUser('id') userId: string, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @Get('user')
  getUserTasks(@GetUser('id') userId: string) {
    return this.taskService.getUserTasks(userId);
  }

  @Get('all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Patch('update/:taskId')
  updateTask(
    @GetUser('id') userId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, taskId, dto);
  }

  @Delete('delete/:taskId')
  deleteTask(@GetUser('id') userId: string, @Param('taskId') taskId: string) {
    return this.taskService.deleteTask(userId, taskId);
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }
}
