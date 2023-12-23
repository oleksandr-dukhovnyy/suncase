<template>
  <div class="counter">
    <div
      class="counter__item counter__action counter__action--dec"
      :class="{
        'counter__action--disabled': value <= min,
      }"
      @click="less"
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
      @click="more"
    >
      <img data-test="increment-item-counter" :src="icon('add')" alt="+" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'inc', value: number): void;
  (e: 'dec', value: number): void;
}>();

const props = withDefaults(
  defineProps<{
    value: number;
    max: number;
    min: number;
  }>(),
  {
    value: 0,
    max: Infinity,
    min: 1,
  }
);

const less = () => {
  if (props.value > props.min) {
    emit('dec', props.value);
  }
};

const more = () => {
  if (props.value < props.max) {
    emit('inc', props.value);
  }
};
</script>

<style scoped lang="scss">
.counter {
  width: 120px;
  height: 26px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  border: 1px solid $color-muted-lighter;
  border-radius: 6px;

  &__separator {
    height: 26px;
    width: 1px;
    background-color: $color-muted-lighter;
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
    font-size: 14px;
    width: 20px;
  }
}
</style>
