<template lang="pug">
v-layout(
  column
  justify-center
  align-center
)
  v-container(fluid)
    v-row
      v-col(cols="12")
        v-row.grey.lighten-5.pa-12(justify="center" align="center")
          v-data-iterator(:items='tasks' :items-per-page.sync='itemsPerPage' hide-default-footer)
            template(v-slot:header)
              v-toolbar.mb-2(color="indigo darken-5" dark flat)
                v-toolbar-title Task Manager
            template(v-slot:default='props')
              v-row
                v-col(v-for="task in props.items" :key='`task${task.id}`' cols="12" sm="6" md="4" lg="3")
                  Task(:taskData="task" #default="{ taskData }")
                    v-card
                      v-card-title.subheading.font-weight-bold {{ taskData.id }}
                      v-divider
                      v-list(dense)
                        v-list-item
                          v-list-item-content Path:
                          v-list-item-content.align-end {{ taskData.path }}
                        v-list-item
                          v-list-item-content Priority:
                          v-list-item-content.align-end {{ taskData.priority }}
                        v-list-item
                          v-list-item-content CPU:
                          v-list-item-content.align-end {{ taskData.cpu }}
                        v-list-item
                          v-list-item-content RAM:
                          v-list-item-content.align-end {{ taskData.memory }}
                        v-list-item
                          v-list-item-content ExecTime:
                          v-list-item-content.align-end {{ taskData.execTime }}
</template>

<script lang="ts">
import Task from '@/components/task.vue';
import { task, taskMapper } from '../store/tasks';
import { store } from '../store';

export default {
  components: {
    Task,
  },

  data(): {
    itemsPerPage: number
    } {
    return {
      itemsPerPage: 100,
    };
  },

  computed: {
    ...taskMapper.mapState(['tasks'])
  },

  created() {
    const taskStore = task.context(store);
    taskStore.dispatch('getTasks');
  },
};
</script>
