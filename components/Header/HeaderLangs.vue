<template>
  <div>
    <span
      v-for="lang in langs"
      :key="lang.value"
      @click="emit('change-current-lang', lang)"
      :class="lang.selected ? 'selected' : ''"
    >
      {{ lang.title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  langs: Localization.Lang[];
}>();

const emit = defineEmits<{
  (e: 'change-current-lang', lang: Localization.Lang): void;
}>();
</script>

<style scoped lang="scss">
div {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  span {
    color: $color-muted;
    font-size: 11px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    cursor: pointer;

    &::selection {
      background-color: transparent;
    }

    &.selected {
      color: #000;
      font-weight: 700;
    }
  }
}
</style>
