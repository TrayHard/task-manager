<template lang="pug">
    .task
        slot(:taskdata="taskdata")
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Task } from '@/types';

export default {
    props: {
        taskdata: {
            type: Object as PropType<Task>,
            default: () => {}
        },
    },
};
</script>
