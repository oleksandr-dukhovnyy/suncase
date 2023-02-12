<template>
  <div class="logo__contain">
    <div class="logo">
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
  top: 130px;
  left: calc(50% - 104px);

  @include _media-up(md) {
    z-index: 2;
    top: 4px;
  }

  &__contain {
    margin-bottom: padding(15);

    @include _media-up(md) {
      margin-bottom: 0;
    }
  }

  img {
    width: 42px;
    height: 42px + padding();
    padding-bottom: padding();
  }

  h1 {
    @include font-md;
    font-weight: $font-weight-bold;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    line-height: 1;
    text-align: center;
    width: max-content;
    margin: padding() 0;

    span {
      @include font-xsm;
      font-weight: $font-weight-light;
      text-transform: uppercase;
      letter-spacing: 0.35em;
    }
  }
}
</style>
