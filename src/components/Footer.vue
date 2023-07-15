<template>
  <footer>
    <div>
      © <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
  font-size: 12px;
  display: flex;
  justify-content: center;
  position: absolute;
  // bottom: 0;
  text-align: center;
  width: 100%;
  display: flex;
  height: 23px;
  // bottom: -80px;

  div {
    border-top: 1px solid black;
    padding-top: 10px;
    width: 310px;
    color: $font-color-muted;
    // margin-bottom: 15px;
  }

  a {
    text-decoration: underline;
    color: $font-color-muted;
  }
}
</style>
