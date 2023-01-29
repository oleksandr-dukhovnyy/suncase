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
import Header from '@/components/Header/Header.vue';
import HeaderLogo from '@/components/Header/HeaderLogo.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import FirstScreen from '@/components/FirstScreen.vue';
import Catalog from '@/components/Catalog/Catalog.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped lang="scss">
main {
  @include container;
  background-color: #fff;
  padding-top: $header-height;
  position: relative;
  margin: 0 auto;
}
</style>
