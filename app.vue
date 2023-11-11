<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

const store = useStore();

store.dispatch('cart/FETCH_CART');
</script>
