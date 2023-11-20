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
}

.content {
  flex: 1;
}
</style>
