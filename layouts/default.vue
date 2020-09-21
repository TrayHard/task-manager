<template lang="pug">
    v-app
        v-main
            v-container
                nuxt
        v-footer(absolute app)
            v-row(align="center" justify="center")
                .footer-text {{ footerText }}
</template>

<script lang="ts">
export default {
    data(): {
        footerText: string;
        } {
        return {
            footerText: 'made by CROC'
        };
    },
};
</script>

<style lang="sass" scoped>
.footer-text
    font-size: 12px
</style>
