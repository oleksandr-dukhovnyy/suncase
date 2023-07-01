<template>
  <button
    class="button"
    @click="onClick"
    :class="{
      [`button--type--${type}`]: type !== '',
      [`button--size--${size}`]: size !== '',
      'animate__animated animate__pulse': clicked && animated,
    }"
  >
    <img v-if="iconName !== ''" :src="icon(iconName)" :alt="iconName" />
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const $emit = defineEmits(['click']);
const clicked = ref(false);

const { trustedOnly } = defineProps({
  size: {
    type: String,
    default: '', // '' - is "max-content"
    validate: (str) =>
      ['', 'sm', 'base', 'md', 'lg', 'xl', 'xxl', 'fit'].includes(str),
  },
  type: {
    type: String,
    default: '',
    validate: (str) =>
      ['', 'ghost', 'error', 'info', 'cta', 'black'].includes(str),
  },
  trustedOnly: {
    type: Boolean,
    default: true,
  },
  iconName: {
    type: String,
    default: '',
  },
  animated: {
    type: Boolean,
    default: true,
  },
});

const onClick = (e) => {
  if (
    (trustedOnly && !e.isTrusted) ||
    (trustedOnly && e.clientX === 0 && e.clientY === 0)
  )
    return false;

  clicked.value = true;
  setTimeout(() => (clicked.value = false), 600);

  $emit('click');
};
</script>

<style lang="scss" scoped>
.button {
  // @include font-base;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  padding: padding() padding(2);
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: $border-radius;
  height: 43px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 11px;
    margin-right: padding();
  }

  &--type {
    &--error {
      color: $color-red;
      border-color: $color-red;
    }

    &--error-filled {
      color: #fff;
      background-color: $color-red;
      border-color: $color-red;
    }

    &--info {
      color: $color-blue;
      border-color: $color-blue;
    }

    &--cta {
      color: $color-cta;
    }

    &--black {
      color: $color-black;
      border-color: $color-black;
    }
  }

  &--size {
    &--sm {
      width: 50px;
    }

    &--md {
      width: 120px;
    }

    &--lg {
      width: 170px;
    }

    &--xl {
      width: 200px;
    }

    &--xxl {
      width: 280px;
    }

    &--fit {
      width: 100%;
    }
  }
}
</style>
