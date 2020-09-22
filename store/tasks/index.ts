import {
  Getters, Mutations, Actions, Module, createMapper,
} from 'vuex-smart-module';
import API_REAL, { API_MOCK } from '@/api';
import { ITask } from '~/types';

const API = process.env.MOCK_API ? API_MOCK : API_REAL;

class TaskState {
  tasks: Array<ITask> = [];
}

class TaskGetters extends Getters<TaskState> {
}

class TaskMutations extends Mutations<TaskState> {
  UPDATE_TASKS(tasks: Array<ITask>) {
    this.state.tasks = [...tasks];
  }
}

class TaskActions extends Actions<
  TaskState,
  TaskGetters,
  TaskMutations,
  TaskActions
> {
  getTasks(): Promise<void> {
    return API.getTasks().then((response: Array<ITask>) => {
      this.commit('UPDATE_TASKS', response);
    }).catch((err: Error) => {
      console.error(err.message);
    });
  }

  createTask(taskData: ITask): Promise<boolean> {
    return API.createTask(taskData).then((response: any) => {
      return response.success;
    }).catch((err: Error) => {
      console.error(err.message);
    });
  }

  editTask(payload: { taskID: number, taskData: ITask }): Promise<boolean> {
    return API.editTask(payload.taskID, payload.taskData).then((response: any) => {
      return response.success;
    }).catch((err: Error) => {
      console.error(err.message);
    });
  }

  deleteTask(taskID: number): Promise<boolean> {
    return API.deleteTask(taskID).then((response: any) => {
      return response.success;
    }).catch((err: Error) => {
      console.error(err.message);
    });
  }
}

export const task = new Module({
  state: TaskState,
  getters: TaskGetters,
  mutations: TaskMutations,
  actions: TaskActions,
});
export const taskMapper = createMapper(task);
