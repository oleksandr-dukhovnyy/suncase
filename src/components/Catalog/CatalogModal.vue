<template>
  <Modal v-if="show" @close="hide">
    <div class="modal">
      <div class="modal__slider">
        <img :src="image('')" alt="glasses">
        <div>
          <div>&#60;</div>
          <img v-for="" :src="image('')" alt="glasses"></img>
          <div>	&#62;</div>
        </div>
      </div>
      <div class="modal__info">info</div>
    </div>
  </Modal>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();

const selected = computed(() => store.getters['slider/SELECTED_ITEM']);
const show = computed(
  () => store.getters['slider/SLIDER_SHOW'] && selected.value.defined
);

const hide = () => {
  store.dispatch('slider/HIDE_SLIDER');
};
</script>

<style scoped lang="scss">
.modal {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: padding(4);

  & > * {
    outline: 1px dotted orange;
  }

  &__slider {
    height: calc(80vh - padding(8));
  }

  &__info {
  }
}
</style>
