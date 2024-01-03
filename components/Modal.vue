<template>
  <Teleport to="body">
    <div class="layout" @click.self="close">
      <div
        class="modal animate__animated"
        :class="{
          animate__fadeInDown: !closingOn,
          animate__fadeOutDown: closingOn,
        }"
      >
        <div class="modal__close" data-test="close-modal" @click="close">
          <img :src="icon('close-modal')" alt="X" />
        </div>
        <div class="modal__body" @keydown.esc="close">
          <slot />
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  padding: padding(2);
  background-color: #fcfcfce6;
}

.modal {
  position: relative;
  display: grid;
  vertical-align: middle;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  gap: padding();
  width: 100vw;
  max-width: 1181px;
  height: 100vh;
  max-height: 748px;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;

  --animate-duration: 400ms;

  @include shadow-large;

  &__body {
    position: relative;
    max-height: 668px;
  }

  &__close {
    position: absolute;
    right: 0;
    z-index: 999;
    padding: 15px;
    text-align: right;
    cursor: pointer;

    img {
      width: 18px;
      height: 18px;
      margin: 15px;
    }
  }
}
</style>
