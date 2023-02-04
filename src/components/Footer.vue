<template>
  <footer>
    <div>
      © <a href="mailto:script@vip-person.net">script@vip-person.net</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  @include font-xsm;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  display: flex;
  bottom: padding(-9);

  div {
    border-top: 1px solid black;
    padding-top: padding();
    width: padding(30);
    color: $font-color-muted;
  }

  a {
    text-decoration: underline;
    color: $font-color-muted;
  }
}
</style>
