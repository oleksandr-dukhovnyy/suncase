<template>
  <div class="logo__contain">
    <div class="logo animate__animated animate__fadeInDown">
      <img width="42" height="42" :src="image('logo.png')" alt="sun" />
      <h1>
        suncase <br />
        <span> original shop </span>
      </h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.logo {
  @include container;
  // z-index: 2;
  display: grid;
  grid-template-columns: 42px 1fr;
  grid-gap: padding(2);
  align-items: center;
  position: absolute;
  top: 154px; // 130px
  left: calc(50% - 133.5px);

  @include media-up(md) {
    z-index: 2;
    top: 36px;
  }

  &__contain {
    margin-bottom: padding(15);

    @include media-up(md) {
      margin-bottom: 0;
    }
  }

  img {
    width: 42px;
    height: 42px + padding();
    padding-bottom: padding();
  }

  h1 {
    @include font-lg;
    font-weight: $font-weight-bold;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    line-height: 0.8;
    text-align: center;
    width: max-content;
    margin: padding() 0;

    span {
      @include font-xsm;
      font-weight: $font-weight-light;
      text-transform: uppercase;
      letter-spacing: 0.45em;
    }
  }
}
</style>
