<template>
  <button
    class="button"
    :class="{
      [`button--type--${type}`]: type !== '',
      [`button--size--${size}`]: size !== '',
      'animate__animated animate__pulse': clicked && animated,
    }"
    @click="onClick"
  >
    <img
      v-if="iconName !== ''"
      :style="{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
      }"
      :src="icon(iconName)"
      :alt="iconName"
    />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const clicked = ref(false);

const props = defineProps({
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
  iconSize: {
    type: Number,
    default: 11,
  },
  animated: {
    type: Boolean,
    default: true,
  },
});

const onClick = (e: MouseEvent) => {
  if (
    (props.trustedOnly && !e.isTrusted) ||
    (props.trustedOnly && e.clientX === 0 && e.clientY === 0)
  )
    return false;

  clicked.value = true;
  setTimeout(() => (clicked.value = false), 600);

  emit('click');
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  padding: padding() padding(2);
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;

  &--type {
    &--error {
      border-color: $color-red;
      color: $color-red;
    }

    &--error-filled {
      border-color: $color-red;
      background-color: $color-red;
      color: #fff;
    }

    &--info {
      border-color: $color-blue;
      color: $color-blue;
    }

    &--cta {
      color: $color-cta;
    }

    &--black {
      border-color: $color-black;
      color: $color-black;
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
