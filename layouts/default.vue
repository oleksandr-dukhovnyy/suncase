<template>
  <main class="page">
    <Header />
    <HeaderLogo />
    <div class="content">
      <slot />
    </div>
    <div class="page__footer">
      <Footer />
    </div>
  </main>
</template>

<script lang="ts" setup>
import Header from '~/components/Header/Header.vue';
import HeaderLogo from '~/components/Header/HeaderLogo.vue';

import Footer from '~/components/Footer.vue';
</script>

<style scoped lang="scss">
.page {
  @include container;

  // position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: $header-height;
  background-color: #fff;
}

.content {
  flex: 1;
}
</style>
