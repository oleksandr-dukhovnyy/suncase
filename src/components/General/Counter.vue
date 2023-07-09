<template>
  <div class="counter">
    <div
      class="counter__item counter__action counter__action--dec"
      :class="{
        'counter__action--disabled': value <= min,
      }"
      @click="value > min ? $emit('dec', value) : null"
    >
      <img :src="icon('dec')" alt="-" />
    </div>
    <div class="counter__separator"></div>
    <div class="counter__item counter__value">
      {{ value }}
    </div>
    <div class="counter__separator"></div>
    <div
      class="counter__item counter__action counter__action--add"
      :class="{
        'counter__action--disabled': value >= max,
      }"
      @click="value < max ? $emit('inc', value) : null"
    >
      <img :src="icon('add')" alt="+" />
    </div>
  </div>
</template>

<script setup>
const $emit = defineEmits(['inc', 'dec']);

const { value, max, min } = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped lang="scss">
$width: 90px;
$height: 24px;

$width-xl: 120px;
$height-xl: 26px;

.counter {
  width: $width;
  height: $height;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  border: 1px solid $color-muted-lighter;
  // padding: 0 padding();
  border-radius: $border-radius;
  // user-select: none;

  @include media-up(xl) {
    height: $height-xl;
    width: $width-xl;
  }

  &__separator {
    height: $height;
    width: 1px;
    background-color: $color-muted-lighter;

    @include media-up(xl) {
      height: $height-xl;
    }
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__action {
    cursor: pointer;

    img {
      width: 15px;
      height: 15px;
    }

    &--disabled {
      opacity: 0.3;
    }
  }

  &__value {
    @include font-sm;
    width: 20px;
  }
}
</style>
