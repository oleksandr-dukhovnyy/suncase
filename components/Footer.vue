<template>
  <footer>
    <div>
      © <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font-size: 12px;
  display: flex;
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 100%;
  display: flex;
  height: 23px;

  div {
    border-top: 1px solid black;
    padding-top: 10px;
    width: 310px;
    color: $color-muted;
  }

  a {
    text-decoration: underline;
    color: $color-muted;
  }
}
</style>
