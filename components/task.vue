<template lang="pug">
  .task
    slot(:taskData="taskData" :deleteTask="deleteTask" :submitEditedTask="submitEditedTask")
</template>

<script lang="ts">
import { PropType } from 'vue';
import { ITask } from '@/types';
import { task } from '../store/tasks';
import { store } from '../store';

export default {
  props: {
    taskData: {
      type: Object as PropType<ITask>,
      default: () => ({
        id: 0,
        path: '',
        priority: 0,
        cpu: 0,
        memory: 0,
        execTime: 0,
      })
    },
  },

  methods: {
    deleteTask() {
      const taskStore = task.context(store);
      taskStore.dispatch('deleteTask', this.taskData.id).then((isDeleted: boolean) => {
        this.$emit('deleted', isDeleted);
      }).catch((err: Error) => {
        this.$emit('deleted', false);
        console.error(err.message);
      });
    },
    submitEditedTask(taskData: ITask) {
      const taskStore = task.context(store);
      taskStore.dispatch('editTask', { taskID: this.taskData.id, taskData }).then((isEdited: boolean) => {
        this.$emit('edited', isEdited);
      }).catch((err: Error) => {
        this.$emit('edited', false);
        console.error(err.message);
      });
    }
  },
};
</script>
