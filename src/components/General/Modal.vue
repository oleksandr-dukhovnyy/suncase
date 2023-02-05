<template>
  <Teleport to="body">
    <div class="layout">
      <div class="modal">
        <div class="modal__close">
          <img
            @click="$emit('close')"
            :src="image('/slider/closeBttn.svg')"
            alt=""
          />
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const $emit = defineEmits(['close']);
</script>

<style scoped lang="scss">
.layout {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: padding(2);
  position: fixed;
  z-index: 10;
  background-color: #fcfcfce6;
}

.modal {
  width: 80vw;
  height: 80vh;
  background-color: #fff;
  display: grid;
  grid-template-rows: 24px 1fr;
  grid-template-columns: 1fr;
  gap: padding();
  padding: padding(2);

  @include shadow-large;

  &__body {
  }
  &__close {
    text-align: right;

    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
