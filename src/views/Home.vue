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

<script setup>
import { useStore } from 'vuex';
import { onMounted, onUnmounted } from 'vue';

import Header from '@/components/Header/Header.vue';
import HeaderLogo from '@/components/Header/HeaderLogo.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import FirstScreen from '@/components/FirstScreen.vue';
import Catalog from '@/components/Catalog/Catalog.vue';
import Footer from '@/components/Footer.vue';

const $store = useStore();

$store.dispatch('cart/FETCH_CART');

const listenESC = function (e) {
  if (e.key === 'Escape') {
    if (
      $store.getters['cart/SHOW_CART_POPUP'] &&
      $store.getters['slider/SLIDER_SHOW']
    ) {
      $store.dispatch('slider/HIDE_SLIDER');
    } else {
      $store.dispatch('cart/HIDE_CART');
      $store.dispatch('slider/HIDE_SLIDER');
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
