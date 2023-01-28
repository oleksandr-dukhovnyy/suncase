<template>
  <div class="logo">
    <img width="42" height="42" :src="image('logo.png')" alt="sun" />
    <h1>
      suncase <br />
      <span> original shop </span>
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.logo {
  @include container;
  display: grid;
  grid-template-columns: 42px 1fr;
  grid-gap: padding(2);
  align-items: center;
  position: absolute;
  top: 4px;
  left: calc(50% - 128px);

  img {
    width: 42px;
    height: 42px + padding();
    padding-bottom: padding();
  }

  h1 {
    @include font-md;
    font-weight: 600;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    line-height: 1;
    text-align: center;
    width: max-content;
    margin: padding() 0;

    span {
      @include font-xsm;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.35em;
    }
  }
}
</style>
