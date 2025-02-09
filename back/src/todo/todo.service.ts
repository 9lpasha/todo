import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async create(title: string): Promise<Todo> {
    return this.todoModel.create({ title });
  }

  async update(id: string, completed: boolean): Promise<Todo | null> {
    return this.todoModel.findByIdAndUpdate(id, { completed }, { new: true });
  }

  async delete(id: string): Promise<Todo | null> {
    return this.todoModel.findByIdAndDelete(id);
  }
}
