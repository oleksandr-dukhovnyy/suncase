<template>
  <div class="items-list">
    <div class="items-list__item" v-for="(item, i) in ITEMS" :key="i">
      <Item
        :title="item.brend"
        :model="item.model"
        :coast="item.coast"
        :sale="item.sale"
        :oldCoast="item.oldCoast"
        :isNew="item.isNew"
        :id="item.id"
        @clicked="openSlider(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import Item from './Item.vue';
import { useStore } from 'vue2-helpers/vuex';
import { computed } from 'vue';

const $store = useStore();
$store.dispatch('glasses/FETCH_SUNGLASESS');

const ITEMS = computed(() => $store.getters['glasses/SUNGLASESS_LIST']);

const openSlider = (id) => {
  console.log('open in slider ' + id);
};
</script>

<style scoped lang="scss">
$item-width: 150px;
$item-width-md: 170px;
$item-width-xl: 200px;

.items-list {
  display: grid;
  gap: padding(4);
  grid-template-columns: repeat(3, $item-width);

  @include _media-up(md) {
    grid-template-columns: repeat(4, $item-width-md);
    gap: padding(5);
  }

  @include _media-up(xl) {
    gap: padding(6);
    grid-template-columns: repeat(4, $item-width-xl);
  }
}
</style>
