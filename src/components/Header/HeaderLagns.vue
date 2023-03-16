<template>
  <div>
    <span
      v-for="lang in langs"
      :key="lang.value"
      @click="$emit('change-current-lang', lang)"
      :class="lang.selected ? 'selected' : ''"
    >
      {{ lang.title }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  langs: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  span {
    color: $font-color-muted;
    @include font-xxsm;
    cursor: pointer;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 0.35em;

    &::selection {
      background-color: transparent;
    }

    &.selected {
      font-weight: 700;
      color: #000;
    }
  }
}
</style>
