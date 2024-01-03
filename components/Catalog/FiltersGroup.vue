<template>
  <ul class="filter-group">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="`filter-group--size-${size}`"
      @click="selected(item.name)"
    >
      <span :class="item.active ? 'active' : ''">
        {{ item.title }}
      </span>
      <div class="filter-group__checkmark">
        <Checkmark v-if="item.active" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import Checkmark from './Checkmark.vue';

const props = withDefaults(
  defineProps<{
    items: {
      title: string;
      name: string;
      active: boolean;
    }[];
    type: string;
    size?: 'sm' | 'md' | 'xl' | 'xsm';
  }>(),
  {
    size: 'md',
  }
);

const emit = defineEmits<{
  (
    e: 'selected',
    payload: {
      value: string;
      type: string;
    }
  ): void;
}>();

const selected = (name: string) => {
  emit('selected', { value: name, type: props.type });
};
</script>

<style lang="scss" scoped>
.filter-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0;
  letter-spacing: 5.4px;

  &--size {
    &-xsm {
      font-size: 12px;
    }

    &-md {
      font-size: 20px;
      letter-spacing: 8.1px;
    }
  }

  @include media-up(md) {
    gap: 18px;
  }

  &__checkmark {
    @include media-up(md) {
      position: absolute;
      right: -20px;

      // 20px/20px - is a checkmark size
    }
  }

  li {
    display: flex;
    align-items: center;
    padding: 0;
    color: $color-muted;
    list-style: none;
    font-weight: 400;
    cursor: pointer;

    span {
      width: 100%;
      line-height: 1.25;
      text-align: right;
      text-transform: uppercase;

      &::selection {
        background-color: transparent;
      }

      &.active {
        color: $color-black;
      }

      @include media-up(xl) {
        transition: color 700ms;

        &:hover {
          color: $color-black;
          transition: color 150ms;
        }
      }
    }
  }
}
</style>
