<template>
  <header>
    <div class="contacts" @click="scrollToTop">
      <p>
        <span class="contacts__phone">{{ phone }}</span>
        <span class="contacts__city"> Kyiv </span>
      </p>
    </div>
    <div class="left-group">
      <HeaderLagns @change-current-lang="changeCurrentCang" />
      <HeaderCart />
    </div>
  </header>
</template>

<script setup>
import HeaderLagns from './HeaderLagns.vue';
import HeaderCart from './HeaderCart.vue';

const scrollToTop = () => {
  self.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeCurrentCang = (newLang) => {
  console.log('changeCurrentCang', newLang);
};
</script>

<style lang="scss" scoped>
header {
  @include container;
  height: $header-height;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;

  .contacts {
    height: $header-height;
    display: flex;
    align-items: center;
    cursor: pointer;

    p {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
    }

    &__phone {
      @include font-base;

      font-weight: 300;
    }

    &__city {
      @include font-sm;
      text-transform: uppercase;
      color: $font-color-muted;
    }
  }

  .left-group {
    display: flex;
    gap: padding(4);
  }
}
</style>
