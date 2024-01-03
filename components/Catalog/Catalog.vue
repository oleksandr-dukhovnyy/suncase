<template>
  <section class="catalog scroll-anchor" id="js-catalog">
    <div class="catalog__filters">
      <Filters />
    </div>
    <div class="catalog__hamburger">
      <img
        :src="image('suncase-logo.png')"
        alt="sun"
        @click="scrollToCatalogAndTop"
      />
      <img :src="icon('menu')" alt="menu" @click="showSideModal = true" />
    </div>
    <div class="catalog__items">
      <ItemsList />
    </div>
  </section>
  <CatalogHamburgerMenu v-if="showSideModal" @close="showSideModal = false" />
  <CatalogModal />
</template>

<script lang="ts" setup>
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
  grid-template-rows: 42px 1fr;
  grid-template-columns: 1fr;
  gap: 30px 110px;
  justify-content: space-evenly;
  width: 100%;
  margin: 60px 0 0;
  padding: 0 30px;

  @include media-up(xsm) {
    grid-template-rows: 1fr;
    grid-template-columns: 155px 1fr;
  }

  &__filters {
    display: none;

    @include media-up(xsm) {
      display: block;

      // height: max-content;
      // position: sticky;
      // top: 120px;
    }
  }

  &__hamburger {
    position: sticky;
    top: 14px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    margin-left: -10px;

    @include media-up(sm) {
      top: 110px;
    }

    @include media-up(xsm) {
      display: none;
    }
  }
}
</style>
