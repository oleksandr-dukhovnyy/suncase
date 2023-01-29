<template>
  <div class="item" @click="$emit('clicked')">
    <img :src="image(`${id}/1.jpg`)" alt="sunglasses picture" />
    <strong>{{ title }}</strong>
  </div>
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
$item-width: 150px;
$item-width-md: 170px;
$item-width-xl: 200px;

.item {
  width: $item-width;
  height: 200px;
  outline: 1px dotted coral;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @include _media-up(md) {
    width: $item-width-md;
  }

  @include _media-up(xl) {
    width: $item-width-xl;
  }

  strong {
    @include font-base;
    letter-spacing: $font-letter-spacing-base;
    color: $font-color-cta;
    font-weight: 200;
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
}
</style>
