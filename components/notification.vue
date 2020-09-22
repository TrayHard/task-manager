<template lang="pug">
  v-snackbar
    | {{ text }}
    template(v-slot:action="{ attrs }")
      v-btn(color="pink" text v-bind="attrs" @click="notification.isShown = false")
        | Close
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
