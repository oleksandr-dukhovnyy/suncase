<template>
  <div>
    <span
      v-for="lang in langs"
      :key="lang.value"
      @click="setLang(lang)"
      :class="currentLang === lang.value ? 'selected' : ''"
    >
      {{ lang.title }}
    </span>
  </div>
</template>

<script setup>
import { ref as $ref, watch as $watch, defineEmits } from 'vue';

const $emit = defineEmits(['change-current-lang']);

const currentLang = $ref('en-US');

const setLang = ({ value }) => {
  currentLang.value = value;
};

const langs = [
  {
    title: 'eng',
    value: 'en-US',
  },
  {
    title: 'ua',
    value: 'uk-UA',
  },
];

$watch(currentLang, () => {
  $emit('change-current-lang', currentLang.value);
});
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: padding();

  span {
    color: $font-color-muted;
    @include font-sm;
    cursor: pointer;
    text-transform: uppercase;
    &::selection {
      background-color: transparent;
    }

    &.selected {
      font-weight: 600;
      color: $font-color-black;
    }
  }
}
</style>
