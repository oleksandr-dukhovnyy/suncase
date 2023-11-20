<template>
  <div class="animate__animated animate__fadeInLeft">
    <div v-for="({ items, type }, key) in FILTERS" :key="key">
      <FiltersGroup
        :size="key === 0 ? 'md' : 'xsm'"
        :items="items"
        :type="type"
        @selected="select"
      />
      <div v-if="key !== FILTERS.length - 1" class="separator"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FiltersGroup from './FiltersGroup.vue';
import { useGlassesStore } from '~/store/glasses';

const glassesStore = useGlassesStore();
const FILTERS = computed(() => glassesStore.FILTERS);

const select = ({ type, value }) => {
  const actionName = `TOGGLE_FILTER_${type.toUpperCase()}`;

  if (actionName in glassesStore) {
    glassesStore[actionName](value);
  }
};
</script>

<style lang="scss" scoped>
.separator {
  width: 50%;
  height: 1px;
  background-color: $color-muted;
  margin: 40px 0 20px auto;
}
</style>
