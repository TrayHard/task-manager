import axios, { AxiosResponse } from 'axios';
import { Task } from '@/types';

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
    createTask: (taskData: Task): any => API.post(endPoints.createTask, taskData),
    editTask: (taskID: number, taskData: Task): any => API.put(endPoints.editTask, { taskID, taskData }),
    deleteTask: (taskID: number): any => API.delete(endPoints.deleteTask, { data: { taskID } }),
};
