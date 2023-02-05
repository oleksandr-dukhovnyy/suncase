<template>
  <!-- :class="'d-none d-xl-grid'" -->
  <section class="catalog" id="catalog">
    <div class="catalog__filters">
      <Filters />
    </div>
    <div class="catalog__items">
      <ItemsList />
    </div>
  </section>
  <CatalogModal />
</template>

<script setup>
import CatalogModal from './CatalogModal.vue';
import Filters from './Filters.vue';
import ItemsList from './ItemsList.vue';
</script>

<style lang="scss" scoped>
.catalog {
  @include container;
  // outline: 1px dotted coral;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: padding(4);
  margin: 0 auto;

  @include _media-up(md) {
    grid-template-columns: 180px 1fr;
  }

  &__filters {
    display: none;

    @include _media-up(md) {
      display: block;
    }
  }
}
</style>
