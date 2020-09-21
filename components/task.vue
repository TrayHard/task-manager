<template lang="pug">
    .task
        slot(:taskData="taskData")
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Task } from '@/types';

export default {
    props: {
        taskData: {
            type: Object as PropType<Task>,
            default: () => {}
        },
    },
};
</script>
