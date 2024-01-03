<template>
  <Teleport to="body">
    <div
      class="side-modal animate__animated"
      :class="closing ? 'animate__fadeOut' : 'animate__fadeIn'"
      @click.self="close"
    >
      <div
        class="side-modal__inner animate__animated"
        :class="closing ? 'animate__fadeOutLeft' : 'animate__fadeInLeft'"
      >
        <div class="side-modal__close" @click="close">
          <img :src="image('slider/closeBttn.svg')" alt="close" />
        </div>
        <div class="side-modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import bodyScroll from '~/helpers/bodyScroll';

onMounted(() => {
  if (!bodyScroll.lockedNow()) bodyScroll.rem();
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closing = ref(false);

const close = () => {
  if (closing.value) return;

  closing.value = true;

  setTimeout(() => {
    emit('close');
    closing.value = false;
    bodyScroll.add();
  }, 400);
};

onUnmounted(bodyScroll.add);
</script>

<style lang="scss" scoped>
.side-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #fcfcfce6;

  --animate-duration: 300ms;

  &__inner {
    @include shadow;

    display: flex;
    flex-direction: column;
    gap: padding();
    width: 70vw;
    height: 100vh;
    padding: padding(2);
    background-color: #fff;
  }

  &__content {
    overflow: auto;
  }

  &__close {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    justify-content: flex-end;
    padding: 22px;

    // outline: 1px dotted coral;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
