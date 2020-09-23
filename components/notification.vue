<template lang="pug">
  v-snackbar(v-model="isShown" @input="event => $emit('input', event)")
    | {{ text }}
    template(v-slot:action="{ attrs }")
      v-btn(color="pink" text v-bind="attrs" @click="$emit('input', false)" icon)
        v-icon mdi-close
</template>

<script lang="ts">
export default {
  model: {
    prop: 'isShown',
    event: 'input'
  },

  props: {
    isShown: {
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
