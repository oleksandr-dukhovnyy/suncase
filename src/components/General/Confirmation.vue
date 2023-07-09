<template>
  <div class="confirm" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div class="confirm__content" @click="show = true">
      <slot />
    </div>
    <div v-if="show" class="confirm__control">
      <p :style="{ color }">
        {{ text }}
      </p>
      <div class="confirm__bttns">
        <button @click="onConfirm">
          <img :src="icon('ok-fat')" alt="yes" />
        </button>
        <div class="confirm__control-separator"></div>
        <button @click="show = false">
          <img :src="icon('close-black')" alt="no" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  text: {
    type: String,
    default: 'Are you sure?',
  },
  color: {
    type: String,
    default: '#000',
  },
});
const $emit = defineEmits(['confirm']);

const show = ref(false);
let timerID = null;

const onConfirm = () => {
  show.value = false;
  $emit('confirm');
};

const onMouseleave = () => {
  timerID = setTimeout(() => {
    show.value = false;
  }, 1500);
};

const onMouseenter = () => {
  clearTimeout(timerID);
};
</script>

<style scoped lang="scss">
.confirm {
  width: 100%;
  position: relative;
  z-index: 10;

  &__bttns {
    border: 1px solid $color-muted-lighter;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    padding: 0 padding();
  }

  &__control {
    width: max-content;
    right: 16px;
    top: 10px + padding();
    border-radius: $border-radius 0 $border-radius $border-radius;
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: padding();
    background-color: #fff;
    gap: padding();
    border: 1px solid red;
    @include shadow;

    &-separator {
      width: 1px;
      background-color: $color-muted-lighter;
      height: 24px;
    }

    p {
      @include font-sm;
      text-align: center;
      width: max-content;
    }

    img {
      width: 16px;
    }

    button {
      @include button-reset;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
