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
import { useStore } from 'vue2-helpers/vuex';
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
  @include font-sm;
  display: flex;
  justify-content: center;
  gap: padding(8);
  margin: padding(4) auto;

  span {
    @include font-sm;
    color: $font-color-cta;
    text-transform: uppercase;
    padding: padding(2);
    font-weight: 700;
    letter-spacing: 0.3em;
    cursor: pointer;
  }
}
</style>
