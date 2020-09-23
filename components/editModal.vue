<template lang="pug">
  v-dialog(:value="isShown" @input="event => $emit('input', event)" max-width="290" v-if="data")
    v-card
      v-card-title.headline {{ phrases.editModalTitle(data.id) }}
      v-card-text
        v-text-field(
          :label="phrases.priority"
          solo
        )
      v-card-actions
        v-spacer
        v-btn(color='green darken-1' text @click="edit")
          v-icon mdi-check
        v-btn(color='green darken-1' text @click="closeModal" icon)
          v-icon mdi-close
</template>

<script lang="ts">
import { PropType } from 'vue';
import phrases from '~/config/phrases';
import { ITask } from '~/types';

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
    data: {
      type: Object as PropType<ITask>,
      default: () => ({
        id: 0,
        path: '',
        priority: 0,
        cpu: 0,
        memory: 0,
        execTime: 0,
      })
    },
    submit: {
      type: Function as PropType<(taskData: ITask) => void>,
      default: () => {}
    }
  },

  data() {
    return {
      phrases,
    };
  },

  methods: {
    closeModal() {
      this.$emit('input', false);
    },
    edit() {
      this.closeModal();
      //@ts-ignore
      this.submit(this.data);
    }
  },
};
</script>

<style lang="sass" scoped>

</style>
