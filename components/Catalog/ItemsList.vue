<template>
  <div class="items-list">
    <div class="items-list__item" v-for="(item, i) in ITEMS" :key="i">
      <ProductCard v-bind="item" @clicked="openSlider(item.id)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlassesStore } from '~/store/glasses';
import { useSliderStore } from '~/store/slider';

const glassesStore = useGlassesStore();
const sliderStore = useSliderStore();

glassesStore.FETCH_SUNGLASSES();

const ITEMS = computed(() => glassesStore.SUNGLASSES_LIST);

const openSlider = (id: Glasses.Item['id']) => {
  sliderStore.SET_SELECTED(id);
  sliderStore.SHOW_SLIDER();
};
</script>

<style scoped lang="scss">
.items-list {
  display: grid;
  gap: 50px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 200px);
  padding-right: 0;

  @include media-up(xsm) {
    padding-right: 80px;
  }

  @include media_up(xxl) {
    padding-right: 0;
  }
}
</style>
