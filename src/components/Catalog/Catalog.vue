<template>
  <section class="catalog" id="catalog">
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
  @include _media-up(md) {
    outline: 1px dotted coral;
  }

  display: grid;
  grid-template-columns: 220px 1fr;
}
</style>
