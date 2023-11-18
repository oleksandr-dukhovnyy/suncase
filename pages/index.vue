<template>
  <main class="page">
    <Header />
    <HeaderLogo />
    <TopNavigation />
    <FirstScreen />
    <Catalog />
    <div class="page__footer">
      <Footer />
    </div>
  </main>
</template>

<script lang="ts" setup>
import Header from '@/components/Header/Header.vue';
import HeaderLogo from '@/components/Header/HeaderLogo.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import FirstScreen from '@/components/FirstScreen.vue';
import Catalog from '@/components/Catalog/Catalog.vue';
import Footer from '@/components/Footer.vue';

import { useCartStore } from '~/store/cart';
import { useSliderStore } from '~/store/slider';

const cartStore = useCartStore();
const sliderStore = useSliderStore();
// const $store = useStore();

cartStore.FETCH_CART();

const listenESC = function (e) {
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

<style scoped lang="scss">
.page {
  @include container;
  display: flex;
  gap: 50px;
  flex-direction: column;
  min-height: 100vh;
  padding-top: $header-height;
  position: relative;
  margin: 0 auto;

  background-color: #fff;

  &__footer {
    margin: 30px 0;
    height: 23px;
  }

  // @include media-up(md) {
  //   padding-top: 76px;
  // }
}
</style>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;

  // outline: 1px dotted coral;
}

p {
  margin: 0;
}

html,
body {
  scroll-behavior: smooth;
  background-color: #fff;
  position: relative;
}

img {
  user-select: none;
}

.d {
  &-block {
    display: block !important;
  }
  &-none {
    display: none !important;
  }

  &-sm {
    @include media-up(sm) {
      &-block {
        display: block !important;
      }
      &-none {
        display: none !important;
      }
    }
  }
  &-md {
    @include media-up(md) {
      &-block {
        display: block !important;
      }
      &-none {
        display: none !important;
      }
    }
  }
  &-xl {
    @include media-up(xl) {
      &-block {
        display: block !important;
      }
      &-grid {
        display: grid !important;
      }
      &-none {
        display: none !important;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
