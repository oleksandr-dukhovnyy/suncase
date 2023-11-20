<template>
  <Teleport to="body">
    <div class="layout" @click.self="close" data-test="close-modal">
      <div
        class="modal animate__animated"
        :class="{
          animate__fadeInDown: !closingOn,
          animate__fadeOutDown: closingOn,
        }"
      >
        <div class="modal__close" @click="close">
          <img :src="icon('close-modal')" alt="X" />
        </div>
        <div class="modal__body" @keydown.esc="close">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closingOn = ref(false);

const close = () => {
  if (closingOn.value) return;
  closingOn.value = true;

  setTimeout(() => {
    emit('close');
  }, 250);
};
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
  border-radius: 8px;
  width: 100vw;
  height: 100vh;
  vertical-align: middle;
  max-height: 748px;
  max-width: 1181px;
  background-color: #fff;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  gap: padding();
  padding: 30px;
  position: relative;

  --animate-duration: 400ms;

  @include shadow-large;

  &__body {
    max-height: 668px;
    position: relative;
  }

  &__close {
    text-align: right;
    position: absolute;
    z-index: 999;
    right: 0;
    padding: 15px;
    cursor: pointer;

    img {
      margin: 15px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>
