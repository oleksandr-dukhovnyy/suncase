<template>
  <main>
    <Header />
    <HeaderLogo />
    <TopNavigation />
    <FirstScreen />
    <Catalog />
    <Footer />
  </main>
</template>

<script setup>
import { useStore } from 'vuex';

import Header from '@/components/Header/Header.vue';
import HeaderLogo from '@/components/Header/HeaderLogo.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import FirstScreen from '@/components/FirstScreen.vue';
import Catalog from '@/components/Catalog/Catalog.vue';
import Footer from '@/components/Footer.vue';
// import Modal from '../components/Modal.vue';

const $store = useStore();

$store.dispatch('cart/FETCH_CART');
</script>

<style scoped lang="scss">
main {
  @include container;
  display: flex;
  gap: padding(5);
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  padding-top: $header-height;
  position: relative;
  margin: 0 auto padding(10);

  @include _media-up(md) {
    padding-top: $header-height-md;
  }
}
</style>
