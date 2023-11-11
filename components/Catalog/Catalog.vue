<template>
  <section class="catalog" id="catalog">
    <div class="catalog__filters">
      <Filters />
    </div>
    <div class="catalog__hamburger" @click="showSideModal = true">
      <img :src="icon('menu')" alt="menu" />
    </div>
    <div class="catalog__items">
      <ItemsList />
    </div>
  </section>
  <CatalogHamburgerMenu v-if="showSideModal" @close="showSideModal = false" />
  <CatalogModal />
</template>

<script setup>
import { ref } from 'vue';
import CatalogModal from './CatalogModal.vue';
import Filters from './Filters.vue';
import ItemsList from './ItemsList.vue';
import CatalogHamburgerMenu from './CatalogHamburgerMenu.vue';

const showSideModal = ref(false);
</script>

<style lang="scss" scoped>
.catalog {
  @include container;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 42px 1fr;
  column-gap: 110px;
  margin: 60px 0 0;
  justify-content: space-evenly;
  width: 100%;
  row-gap: 30px;
  padding: 0 30px;

  @include media-up(xsm) {
    grid-template-rows: 1fr;
    grid-template-columns: 155px 1fr;
  }

  &__filters {
    display: none;

    @include media-up(xsm) {
      display: block;
    }
  }

  &__hamburger {
    @include media-up(xsm) {
      display: none;
    }
  }
}
</style>
