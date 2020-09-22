import axios, { AxiosResponse } from 'axios';
import { ITask } from '@/types';

const API = axios.create({
  baseURL: process.env.API_URL,
  headers: { Accept: 'application/json' },
  timeout: 5000,
});

API.interceptors.response.use((response: AxiosResponse) => {
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    return response.data as any;
  }
}, (error: Error) => {
  console.error(error.message);
  throw error;
});

const endPoints = {
  getTasks: '/',
  createTask: '/create',
  editTask: '/edit',
  deleteTask: '/delete',
};

export default {
  getTasks: (): any => API.get(endPoints.getTasks),
  createTask: (taskData: ITask): any => API.post(endPoints.createTask, taskData),
  editTask: (taskID: number, taskData: ITask): any => API.put(endPoints.editTask, { taskID, taskData }),
  deleteTask: (taskID: number): any => API.delete(endPoints.deleteTask, { data: { taskID } }),
};

localStorage.setItem('tasks', JSON.stringify(
  [
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
  ]
));

export const API_MOCK = {
  getTasks: (): Promise<Array<ITask>> => Promise.resolve(JSON.parse(localStorage.getItem('tasks') || '[]') as Array<ITask>),
  createTask: (taskData: ITask): Promise<{ success: boolean }> => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Array<ITask>;
      tasks.push(taskData);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return Promise.resolve({ success: true });
    } catch (error) {
      return Promise.resolve({ success: false });
    }
  },
  editTask: (taskID: number, taskData: ITask): Promise<{ success: boolean }> => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Array<ITask>;
      const id = tasks.findIndex(el => el.id === taskID);
      tasks.splice(id, 1, taskData);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return Promise.resolve({ success: true });
    } catch (error) {
      return Promise.resolve({ success: false });
    }
  },
  deleteTask: (taskID: number): Promise<{ success: boolean }> => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Array<ITask>;
      const id = tasks.findIndex(el => el.id === taskID);
      tasks.splice(id, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return Promise.resolve({ success: true });
    } catch (error) {
      return Promise.resolve({ success: false });
    }
  },
};
