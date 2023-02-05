<template>
  <article class="item" @click="$emit('clicked')">
    <img :src="image(`${id}/1.jpg`)" alt="sunglasses picture" />
    <strong>{{ title }}</strong>
    <em>{{ model }}</em>
    <div class="item__price">
      <p class="item__coast" :class="sale ? 'item__coast--line-through' : ''">
        ${{ sale ? oldCoast : coast }}
      </p>
      <p v-if="sale" class="item__new-coast">${{ coast }}</p>
    </div>
    <div class="item__new" v-if="isNew">new</div>
  </article>
</template>

<script setup>
const $emit = defineEmits(['clicked']);

const { title, model, coast, sale, oldCoast, isNew, id } = defineProps({
  title: {
    type: String,
  },
  model: {
    type: String,
  },
  coast: {
    type: Number,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  oldCoast: {
    type: Number,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
@import './catalog-style-vars.scss';

.item {
  width: $item-width;
  height: 175px;
  // outline: 1px dotted coral;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: padding();
  position: relative;

  @include _media-up(sm) {
    width: $item-width-sm;
  }

  @include _media-up(md) {
    width: $item-width-md;
  }

  @include _media-up(xl) {
    width: $item-width-xl;
  }

  img {
    width: $item-width;

    @include _media-up(md) {
      width: $item-width-md;
    }

    @include _media-up(xl) {
      width: $item-width-xl;
    }
  }

  &__price {
    display: flex;
    gap: padding();
  }

  &__coast {
    @include font-base;
    color: $font-color-cta;

    &--line-through {
      text-decoration: line-through;
    }
  }

  &__new-coast {
    color: $font-color-red;
  }

  &__new {
    @include font-xxsm;
    @include rotate;
    text-transform: uppercase;
    line-height: 1;
    border: 1px solid red;
    position: absolute;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-color-red;
    bottom: 85px;
    right: 0;

    @include _media-up(xl) {
      bottom: 62px;
      width: 50px;
      height: 50px;
    }
  }

  strong {
    @include font-base;
    letter-spacing: $font-letter-spacing-sm;
    color: $font-color-cta;
    font-weight: 200;
  }

  em {
    @include font-sm;
    letter-spacing: $font-letter-spacing-sm;
    font-style: normal;
    color: $font-color-muted;
  }
}
</style>
