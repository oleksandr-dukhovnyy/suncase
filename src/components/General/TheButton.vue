<template>
  <button
    class="button"
    @click="onClick"
    :class="{
      [`button--type--${type}`]: type !== '',
      [`button--size--${size}`]: size !== '',
    }"
  >
    <img v-if="iconName !== ''" :src="icon(iconName)" :alt="iconName" />
    <slot></slot>
  </button>
</template>

<script setup>
const $emit = defineEmits(['click']);

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
  @include font-base;
  text-transform: uppercase;
  padding: padding() padding(2);
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #939393;
  border-radius: $border-radius;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: calc(36px - padding(2));
    margin-right: padding();
  }

  &--type {
    &--error {
      color: $color-red;
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
