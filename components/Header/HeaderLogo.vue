<template>
  <div class="logo__contain" @click="toMain">
    <div class="logo animate__animated animate__fadeInDown">
      <img width="42" height="42" :src="image('logo.png')" alt="sun" />
      <h1>
        <span class="logo__title"> suncase </span>
        <span class="logo__subtitle"> original shop </span>
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toMain = () => navigateTo('/');
</script>

<style scoped lang="scss">
.logo {
  @include container;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 10px;
  align-items: center;
  position: absolute;
  top: 154px;
  left: calc(50% - 125.795px);
  cursor: pointer;

  @include media-up(md) {
    z-index: 2;
    top: 24px;
  }

  &__contain {
    margin-bottom: padding(15);

    @include media-up(md) {
      margin-bottom: 0;
    }
  }

  h1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin: 0;
    width: max-content;
  }

  &__subtitle {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.45em;
    color: $color-muted;
  }

  &__title {
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    text-align: center;
  }
}
</style>
