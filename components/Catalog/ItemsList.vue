<template>
  <div class="items">
    <div class="items__list">
      <div v-for="(item, i) in glassesStore.SUNGLASSES_LIST" :key="i">
        <ProductCard v-bind="item" @clicked="openSlider(item.id)" />
      </div>
    </div>

    <Pagination
      :total="glassesStore.SUNGLASSES_PAGINATION.totalPages"
      :per-page="glassesStore.SUNGLASSES_PAGINATION.perPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { useGlassesStore } from '~/store/glasses';
import { useSliderStore } from '~/store/slider';
import Pagination from './Pagination.vue';

const route = useRoute();
const glassesStore = useGlassesStore();
const sliderStore = useSliderStore();

watch(
  () => route.query.page,
  () => glassesStore.SET_PAGE(+(route.query.page || 1) as number),
  { immediate: true }
);

await glassesStore.FETCH_SUNGLASSES();

const openSlider = (id: Glasses.Item['id']) => {
  sliderStore.SET_SELECTED(id);
  sliderStore.SHOW_SLIDER();
};
</script>

<style scoped lang="scss">
.items {
  display: flex;
  flex-direction: column;
  gap: 50px;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 50px;
    justify-content: center;
    padding-right: 0;

    @include media-up(xsm) {
      padding-right: 80px;
    }

    @include media_up(xxl) {
      padding-right: 0;
    }
  }
}
</style>
