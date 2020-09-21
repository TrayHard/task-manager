import {
    Getters, Mutations, Actions, Module, createMapper,
} from 'vuex-smart-module';
import API from '@/api';
import { Task } from '~/types';

class TaskState {
    tasks: Array<Task> = [];
}

class TaskGetters extends Getters<TaskState> {
}

class TaskMutations extends Mutations<TaskState> {
    UPDATE_TASKS(tasks: Array<Task>) {
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
        return API.getTasks().then((response: Array<Task>) => {
            this.commit('UPDATE_TASKS', response);
        }).catch((err: Error) => {
            console.error(err.message);
        });
    }

    createTask(taskData: Task): Promise<boolean> {
        return API.createTask(taskData).then((response: any) => {
            return response.success;
        }).catch((err: Error) => {
            console.error(err.message);
        });
    }

    editTask(payload: { taskID: number, taskData: Task }): Promise<boolean> {
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
