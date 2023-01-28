<template>
  <nav>
    <a href="#"></a>
    <router-link
      v-for="navItem in navItems"
      :to="{ hash: `#g-${navItem}` }"
      :key="navItem"
    >
      {{ navItem }}
    </router-link>
  </nav>
</template>

<script setup>
const $emit = defineEmits(['goTo']);

const navItems = ['man', 'woman', 'kids'];
</script>

<style lang="scss" scoped>
div {
  margin: 45px auto;
  a:visited {
    color: $font-color-link;
  }
}
</style>
