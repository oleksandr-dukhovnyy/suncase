<template>
  <nav class="nav">
    <span
      v-for="navItem in navItems"
      :key="navItem"
      @click="selectCategory(navItem)"
    >
      {{ navItem }}
    </span>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex';
import scrollToGoods from '@/js/scrollToGoods.js';

const $store = useStore();

const navItems = ['man', 'woman', 'kids'];

const selectCategory = (category) => {
  $store.dispatch('glasses/TOGGLE_FILTER_GENDERS', category);
  scrollToGoods();
};
</script>

<style lang="scss" scoped>
nav {
  // outline: 1px dotted coral;

  @include font-sm;
  display: flex;
  flex-direction: column;
  column-gap: padding(8);
  margin: padding(4) auto;

  @include _media-up(md) {
    justify-content: center;
    flex-direction: row;
  }

  span {
    @include font-sm;
    text-align: center;
    color: $font-color-cta;
    text-transform: uppercase;
    padding: padding(2);
    font-weight: $font-weight-bold;
    letter-spacing: 0.3em;
    cursor: pointer;
  }
}
</style>
