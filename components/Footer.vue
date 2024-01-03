<template>
  <footer>
    <div>
      © <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 23px;
  font-size: 12px;
  text-align: center;

  div {
    width: 310px;
    padding-top: 10px;
    border-top: 1px solid black;
    color: $color-muted;
  }

  a {
    color: $color-muted;
    text-decoration: underline;
  }
}
</style>
