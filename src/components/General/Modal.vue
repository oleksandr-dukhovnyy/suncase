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
        <div class="modal__close">
          <img @click="close" :src="image('slider/closeBttn.svg')" alt="X" />
        </div>
        <div class="modal__body" @keydown.esc="close">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

const $emit = defineEmits(['close']);

const closingOn = ref(false);

const close = () => {
  if (closingOn.value) return;
  closingOn.value = true;

  setTimeout(() => {
    $emit('close');
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

  @include media-down(lg) {
    align-items: flex-start;
    padding-top: 24px;
  }
}

.modal {
  border-radius: $border-radius-xl;
  width: 86vw;
  height: 86vh;
  vertical-align: middle;
  max-height: 720px;
  max-width: 1200px;
  background-color: #fff;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  gap: padding();
  padding: 30px;
  position: relative;

  --animate-duration: 400ms;

  @include shadow-large;

  @include media-down-landscape(lg) {
    height: 72vh;
    max-height: 648px;
  }

  &__body {
    max-height: 668px;
    overflow-y: auto;
    position: relative;
  }

  &__close {
    text-align: right;
    position: absolute;
    z-index: 999;
    right: 0;
    padding: 27px;

    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
