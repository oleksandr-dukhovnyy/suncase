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

cartStore.FETCH_CART();

onMounted(() => document.addEventListener('keydown', listenESC));
onUnmounted(() => document.removeEventListener('keydown', listenESC));

/**
 * Listens for the "Escape" keypress and close popups.
 */
function listenESC(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (cartStore.SHOW_CART_POPUP && sliderStore.SLIDER_SHOW) {
      // Only slider, not cart
      sliderStore.HIDE_SLIDER();
    } else {
      // Close all
      cartStore.HIDE_CART();
      sliderStore.HIDE_SLIDER();
    }
  }
}
</script>
