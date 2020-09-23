<template lang="pug">
  v-snackbar(v-model="value")
    | {{ text }}
    template(v-slot:action="{ attrs }")
      v-btn(color="pink" text v-bind="attrs" @click="value = false" icon)
        v-icon mdi-close
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
