import {
    Getters, Mutations, Actions, Module, createMapper,
} from 'vuex-smart-module';
import API from '@/api';
import { Task } from '~/types';

class TaskState {
    tasks: Array<Task> = [
        {
            id: 203,
            path: '/home/scripts/script4.sh',
            priority: 10,
            cpu: 75,
            memory: 0.1,
            execTime: 120
        },
        {
            id: 24,
            path: '/home/scripts/script5.sh',
            priority: 5,
            cpu: 4,
            memory: 0.01,
            execTime: 140
        },
        {
            id: 653,
            path: '/home/scripts/script6.sh',
            priority: 5,
            cpu: 3,
            memory: 0.5,
            execTime: 150
        },
        {
            id: 83,
            path: '/home/scripts/script7.sh',
            priority: 3,
            cpu: 1,
            memory: 0.001,
            execTime: 43003
        },
        {
            id: 6523,
            path: '/home/scripts/script8.sh',
            priority: 5,
            cpu: 3,
            memory: 0.5,
            execTime: 150
        },
        {
            id: 383,
            path: '/home/scripts/script9.sh',
            priority: 3,
            cpu: 1,
            memory: 0.001,
            execTime: 43003
        },
    ];
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
