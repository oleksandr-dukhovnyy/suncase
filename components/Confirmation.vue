<template>
  <div class="confirm" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div class="confirm__content" @click="show = true">
      <slot />
    </div>
    <div v-if="show" class="confirm__control">
      <p :style="{ color }">
        {{ text }}
      </p>
      <div class="confirm__buttons">
        <button @click="onConfirm">
          <img :src="icon('ok-fat')" alt="yes" />
        </button>
        <div class="confirm__control-separator"></div>
        <button @click="show = false">
          <img :src="icon('close-black')" alt="no" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    text: string;
    color: string;
    timeout?: number;
  }>(),
  {
    text: 'Are you sure?',
    color: '#000',
    timeout: 1500,
  }
);

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const show = ref(false);
let timerID: ReturnType<typeof setTimeout> | undefined = undefined;

const onConfirm = () => {
  show.value = false;
  emit('confirm');
};

const onMouseleave = () => {
  timerID = setTimeout(() => {
    show.value = false;
  }, props.timeout);
};

const onMouseenter = () => clearTimeout(timerID);
</script>

<style scoped lang="scss">
.confirm {
  z-index: 10;

  &__buttons {
    border: 1px solid $color-muted-lighter;
    border-radius: 6px;
    display: flex;
    justify-content: space-around;
    padding: 0 padding();
    height: 24px;
  }

  &__control {
    width: calc(100% - 16px);
    right: 16px;
    bottom: 10px;
    border-radius: 6px 0 6px 6px;
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: padding(1.5) 45px;
    background-color: #fff;
    gap: padding();
    border: 1px solid red;
    @include shadow;

    &-separator {
      width: 1px;
      background-color: $color-muted-lighter;
      height: 100%;
    }

    p {
      font-size: 14px;
      text-align: center;
      width: 100%;
    }

    img {
      width: 16px;
    }

    button {
      @include button-reset;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
