<template lang="pug">
v-layout(
    column
    justify-center
    align-center
)
    v-container(fluid)
        v-row
            v-col(cols='12')
                v-row.grey.lighten-5(style='height: 300px;' justify align='center')
                    Task(:taskdata="task1" #default="taskdata")
                        v-card.ma-3.pa-6(outlined tile)
                            | {{ taskdata }}
                        //- (v-for='n in 3' :key='n')

</template>

<script lang="ts">
import Task from '@/components/task.vue';
import { auth, authMapper } from '../store/auth';
import { store } from '../store';

export default {
    components: {
        Task,
    },

    data() {
        return {
            task1: {
                path: '/home/scripts/script5.sh',
                priority: 10,
                cpu: 75,
                memory: 0.1,
                execTime: 120
            }
        }
    },

    computed: {
        ...authMapper.mapState(['isLoggedIn', 'user1'])
    },

    mounted() {
        const a = auth.context(store);
        console.log(a.getters.loginStatus);
    },
}
</script>
