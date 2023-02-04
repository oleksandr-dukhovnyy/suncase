<template>
  <section :class="'d-none d-xl-grid'" class="catalog" id="catalog">
    <div class="catalog__filters">
      <Filters />
    </div>
    <div class="catalog__items">
      <ItemsList />
    </div>
  </section>
</template>

<script setup>
import Filters from './Filters.vue';
import ItemsList from './ItemsList.vue';
</script>

<style lang="scss" scoped>
.catalog {
  @include container;

  outline: 1px dotted coral;
  @include _media-up(md) {
    outline: none;
  }

  display: grid;
  grid-template-columns: 180px 1fr;
  grid-gap: padding(4);
}
</style>
