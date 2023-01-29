<template>
  <div class="filters">
    <div v-for="({ items, type }, key) in FILTERS" :key="key">
      <FiltersGroup :items="items" :type="type" @selected="selected" />
      <div v-if="key !== FILTERS.length - 1" class="filters__diliver"></div>
    </div>
  </div>
</template>

<script setup>
import FiltersGroup from './FiltersGroup.vue';
import { useStore } from 'vue2-helpers/vuex';
import { computed } from 'vue';

const $store = useStore();
const FILTERS = computed(() => $store.getters['glasses/FILTERS']);

const selected = ({ type, value }) => {
  const actionName = `glasses/TOGGLE_FILTER_${type.toUpperCase()}`;
  $store.dispatch(actionName, value);
};
</script>

<style lang="scss" scoped>
.filters {
  &__diliver {
    width: 60%;
    height: 1px;
    background-color: #000;
    margin: 20px 0 20px auto;
  }
}
</style>
