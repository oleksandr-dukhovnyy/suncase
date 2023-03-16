<template>
  <ul class="filter-group">
    <li
      :class="`filter-group--size-${size}`"
      v-for="(item, i) in items"
      :key="i"
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

<script setup>
import Checkmark from './Checkmark.vue';

const { items, type, size } = defineProps({
  items: {
    type: Array,
  },
  type: {
    type: String,
  },
  size: {
    type: String,
    default: 'md',
    validate: (n) => ['sm', 'md', 'xl'].includes(n),
  },
});

const $emit = defineEmits(['selected']);

const selected = (name) => {
  $emit('selected', { value: name, type });
};
</script>

<style lang="scss" scoped>
// TODO: bring into line with
.filter-group {
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  letter-spacing: 5.4px;
  gap: 18px;

  &--size {
    &-xsm {
      font-size: 12px;
    }

    &-md {
      font-size: 18px;
      letter-spacing: 8.1px;
    }
  }

  @include media-up(md) {
    gap: 18px;
  }

  &__checkmark {
    position: absolute;
    right: -20px;
    // 20px/20px - is a checkmark size
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: padding(0.5) 0;
    font-weight: 400;
    color: #999;

    @include media-up(md) {
      padding: 0;
    }

    span {
      text-transform: uppercase;
      text-align: right;
      width: 100%;
      line-height: 1.25;

      &::selection {
        background-color: transparent;
      }

      &.active {
        color: $font-color-black;
      }

      @include media-screen {
        transition: color 700ms;

        &:hover {
          transition: color 150ms;
          color: $font-color-black;
        }
      }
    }
  }
}
</style>
