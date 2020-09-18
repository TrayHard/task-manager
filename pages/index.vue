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
        .text-center
            logo
            vuetify-logo
        v-card
            v-card-title(class="headline")
                | {{ user1.name }}
            v-card-text
                | TEST
                .text-xs-right
                    | <em><small>&mdash; John Leider</small></em>
                hr.my-3
                a(
                    href="https://nuxtjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                )
                    | Nuxt Documentation
                br
                a(
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    rel="noopener noreferrer"
                )
                    | Nuxt GitHub
            v-card-actions
                v-spacer
                v-btn(
                    color="primary"
                    nuxt
                    to="/inspire"
                )
                    | Ssss
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
