<template lang="pug">
v-layout(
  column
  justify-center
  align-center
)
  v-container(fluid)
    v-row
      v-col(cols="12")
        v-row.grey.lighten-3.pa-12(justify="center" align="center")
          v-data-iterator(:items="tasks" :items-per-page.sync="itemsPerPage" hide-default-footer)
            template(v-slot:header)
              v-toolbar.rounded-t-lg.px-4(color="indigo darken-5" dark flat)
                v-toolbar-title {{ phrases.projectname }}
                v-spacer
                v-btn(icon @click="getTasks")
                  v-icon mdi-refresh
            template(v-slot:default="props")
              .task-manager.secondary.px-5.py-2
                v-row
                  v-col(v-for="task in props.items" :key="`task${task.id}`" cols="12" sm="6" md="3" lg="3")
                    Task(:taskData="task" #default="{ taskData, deleteTask, submitEditedTask }" @deleted="onTaskDeleted" @edited="onTaskEdited")
                      v-card
                        v-card-title.py-3.justify-space-between
                          v-chip(color="teal" text-color="white" small label)
                            span {{ phrases.pid }}: {{ taskData.id }}
                          .task-manager__controls
                            v-btn.mr-1(fab dark x-small color="info" @click.stop="editTask(taskData, submitEditedTask)")
                              v-icon(dark) mdi-pencil
                            v-btn(fab dark x-small color="error" @click="deleteTask")
                              v-icon(dark) mdi-delete
                        v-divider
                        v-list(dense)
                          v-list-item
                            v-list-item-content.align-end
                              pre {{ taskData.path }}
                          v-list-item
                            v-list-item-content {{ phrases.priority }}:
                            v-list-item-content.align-end {{ taskData.priority }}
                          v-list-item
                            v-list-item-content {{ phrases.cpu }}:
                            v-list-item-content.align-end {{ taskData.cpu }}
                          v-list-item
                            v-list-item-content {{ phrases.ram }}:
                            v-list-item-content.align-end {{ taskData.memory }}
                          v-list-item
                            v-list-item-content {{ phrases.exectime }}:
                            v-list-item-content.align-end {{ taskData.execTime }}
  Notification(v-model="notification.isShown" :text="notification.msgs.options[notification.msgs.chosen]")
  Edit-Modal(
    v-model="editModal.isShown"
    :data="editModal.data"
    :submit="editModal.submit"
    @input="editModal.isShown= $event"
  )
</template>

<script lang="ts">
import Task from '@/components/task.vue';
import Notification from '@/components/notification.vue';
import EditModal from '@/components/editModal.vue';
import { task } from '../store/tasks';
import { store } from '../store';
import { ITask } from '~/types';
import phrases from '~/config/phrases';

type NotificationMsgOptions = 'deleted' | 'notdeleted' | 'edited' | 'notedited';

export default {
  components: {
    Task, Notification, EditModal
  },

  data(): {
    phrases: typeof phrases;
    itemsPerPage: number;
    editModal: {
      isShown: boolean;
      data: ITask | null;
      submit: ((taskData: ITask) => void) | null;
    };
    notification: {
      isShown: boolean;
      msgs: {
        chosen: NotificationMsgOptions;
        options: Record<NotificationMsgOptions, string>;
      }
    }
    } {
    return {
      phrases,
      itemsPerPage: 100,
      editModal: {
        isShown: false,
        data: null,
        submit: null,
      },
      notification: {
        isShown: false,
        msgs: {
          chosen: 'deleted',
          options: phrases.notification,
        },
      },
    };
  },

  computed: {
    tasks: {
      get() {
        const taskStore = task.context(store);
        return taskStore.state.tasks;
      },
      set(newTasks: Array<ITask>) {
        const taskStore = task.context(store);
        taskStore.commit('UPDATE_TASKS', newTasks);
      }
    },
  },

  created() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      const taskStore = task.context(store);
      taskStore.dispatch('getTasks');
    },
    onTaskDeleted(status: boolean) {
      this.notification.isShown = true;
      this.notification.msgs.chosen = status ? 'deleted' : 'notdeleted';
      this.getTasks();
    },
    onTaskEdited(status: boolean) {
      this.notification.isShown = true;
      this.notification.msgs.chosen = status ? 'edited' : 'notedited';
      this.getTasks();
    },
    editTask(taskData: ITask, submit: (taskData: ITask) => void) {
      console.log("editTask");
      this.editModal.isShown = true;
      this.editModal.data = taskData;
      this.editModal.submit = submit;
      console.log(this.editModal);
    }
  },
};
</script>

<style lang="sass" scoped>
.task-manager
  min-width: 1065px
</style>
