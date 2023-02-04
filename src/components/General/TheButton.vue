<template>
  <button
    class="button"
    @click="onClick"
    :class="{
      [`button--type--${type}`]: type !== '',
      [`button--size--${size}`]: size !== '',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const $emit = defineEmits(['click']);

const { trustedOnly } = defineProps({
  icon: String,
  size: {
    type: String,
    default: '', // '' - is "max-content"
    validate: (str) =>
      ['', 'sm', 'base', 'md', 'xl', 'xxl', 'fit'].includes(str),
  },
  type: {
    type: String,
    default: '',
    validate: (str) => ['', 'ghost', 'error', 'info', 'cta'].includes(str),
  },
  trustedOnly: {
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

  $emit('click');
};
</script>

<style lang="scss" scoped>
.button {
  text-transform: uppercase;
  padding: padding() padding(2);
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #939393;
  border-radius: $border-radius;

  &--type {
    &--error {
      border-color: #000;
      background-color: $color-red;
    }

    &--info {
      border-color: #000;
      background-color: $color-blue;
    }

    &--cta {
      border-color: #000;
      background-color: $color-cta;
    }
  }

  &--size {
    &--sm {
      width: 50px;
    }

    &--md {
      width: 120px;
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
