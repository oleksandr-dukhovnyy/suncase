<template>
  <NuxtLayout>
    <TopNavigation />
    <FirstScreen />
    <Catalog />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import TopNavigation from '~/components/TopNavigation.vue';
import FirstScreen from '~/components/FirstScreen.vue';
import Catalog from '~/components/Catalog/Catalog.vue';

import { useCartStore } from '~/store/cart';
import { useSliderStore } from '~/store/slider';

const cartStore = useCartStore();
const sliderStore = useSliderStore();
// const $store = useStore();

cartStore.FETCH_CART();

const listenESC = function (e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (cartStore.SHOW_CART_POPUP && sliderStore.SLIDER_SHOW) {
      sliderStore.HIDE_SLIDER();
    } else {
      cartStore.HIDE_CART();
      sliderStore.HIDE_SLIDER();
    }
  }
};

onMounted(() => document.addEventListener('keydown', listenESC));
onUnmounted(() => document.removeEventListener('keydown', listenESC));
</script>
