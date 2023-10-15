<template>
  <div class="items-list">
    <div class="items-list__item" v-for="(item, i) in ITEMS" :key="i">
      <ProductCard v-bind="item" @clicked="openSlider(item.id)" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../General/ProductCard.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const $store = useStore();
$store.dispatch('glasses/FETCH_SUNGLASESS');

const ITEMS = computed(() => $store.getters['glasses/SUNGLASESS_LIST']);

const openSlider = (id) => {
  $store.dispatch('slider/SET_SELECTED', id);
  $store.dispatch('slider/SHOW_SLIDER');
};
</script>

<style scoped lang="scss">
.items-list {
  display: grid;
  gap: 50px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 200px);

  // @include media_up(xsm) {
  //   justify-content: flex-start;
  // }

  padding-right: 0;

  @include media-up(xsm) {
    padding-right: 80px;
  }

  @include media_up(xxl) {
    padding-right: 0;
  }
}
</style>
