<template>
  <ul class="filter-group">
    <li v-for="(item, i) in items" :key="i" @click="selected(item.name)">
      <span :class="item.active ? 'active' : ''">
        {{ item.title }}
      </span>
      <div class="filter-group__checkmark">
        <Checkmark v-if="item.active" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import Checkmark from './Checkmark.vue';

const { items, type } = defineProps({
  items: {
    type: Array,
  },
  type: {
    type: String,
  },
});

const $emit = defineEmits(['selected']);

const selected = (name) => {
  $emit('selected', { value: name, type });
};
</script>

<style lang="scss" scoped>
.filter-group {
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: padding();

  &__checkmark {
    position: absolute;
    right: (-20px - padding());
    // 20px/20px - is a checkmark size
  }

  li {
    @include font-base;
    list-style: none;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      text-transform: uppercase;
      color: $font-color-muted;
      text-align: right;
      width: 100%;
      font-weight: $font-weight-light;

      &::selection {
        background-color: transparent;
      }

      &.active {
        color: $font-color-black;
      }
    }
  }
}
</style>
