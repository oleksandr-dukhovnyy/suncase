<template>
  <!-- :class="'d-none d-xl-grid'" -->
  <section class="catalog" id="catalog">
    <div class="catalog__filters">
      <Filters />
    </div>
    <div class="catalog__hamburder" @click="setShowSideModal(true)">
      <img :src="icon('menu')" alt="menu" />
    </div>
    <div class="catalog__items">
      <ItemsList />
    </div>
  </section>
  <CatalogHamburgerMenu v-if="showSideModal" @close="setShowSideModal(false)" />
  <CatalogModal />
</template>

<script setup>
import CatalogModal from './CatalogModal.vue';
import Filters from './Filters.vue';
import ItemsList from './ItemsList.vue';
import CatalogHamburgerMenu from './CatalogHamburgerMenu.vue';

import { ref } from 'vue';

const showSideModal = ref(false);

const setShowSideModal = (bool) => {
  showSideModal.value = bool;
};
</script>

<style lang="scss" scoped>
.catalog {
  @include container;
  // outline: 1px dotted coral;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 42px 1fr;
  column-gap: padding(4);
  row-gap: padding(4);
  margin: 0 auto;

  @include _media-up(md) {
    grid-template-rows: 1fr;
    grid-template-columns: 180px 1fr;
  }

  &__filters {
    display: none;

    @include _media-up(md) {
      display: block;
    }
  }

  &__hamburder {
    @include _media-up(md) {
      display: none;
    }
  }
}
</style>
