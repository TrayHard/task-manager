<template lang="pug">
v-layout(
    column
    justify-center
    align-center
)
    v-flex(
        xs12
        sm8
        md6
    )
        
</template>

<script lang="ts">
import { auth, authMapper } from '../store/auth';
import { store } from '../store';
import Logo from '../components/Logo.vue';
import VuetifyLogo from '../components/VuetifyLogo.vue';

export default {
    components: {
        Logo,
        VuetifyLogo,
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
