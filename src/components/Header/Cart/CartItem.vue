<template>
  <article class="item" @click="() => $emit('clicked')">
    <img :src="image(`${id}/1.jpg`)" alt="sunglasses picture" />
    <strong class="item__title--shorted" :title="title">{{
      titleShorted
    }}</strong>
    <strong class="item__title">{{ title }}</strong>
    <em class="item__model--shorted" :title="model">{{ modelShorted }}</em>
    <em class="item__model">{{ model }}</em>
    <div class="item__price">
      <p class="item__coast" :class="sale ? 'item__coast--line-through' : ''">
        ${{ sale ? oldCoast : coast }}
      </p>
      <p v-if="sale" class="item__new-coast">${{ coast }}</p>

      <Confirmation
        @click.stop
        color="red"
        :text="'Delete?'"
        @confirm="$emit('remove')"
      >
        <div class="item__remove">
          <img :src="icon('close')" alt="X" />
        </div>
      </Confirmation>
      <!-- <img :src="icon('close')" @click="$emit('remove')" alt="X" /> -->
    </div>
    <div class="item__new" v-if="isNew">new</div>
    <div @click.stop>
      <Counter
        :value="count"
        :max="9"
        @inc="$emit('inc-count')"
        @dec="$emit('dec-count')"
      />
      <!-- <div class="item__delete">x</div> -->
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import Counter from '../../General/Counter.vue';

const $emit = defineEmits(['clicked', 'counter-change', 'remove']);

const { title, model, count } = defineProps({
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
  count: {
    type: Number,
  },
});

const getShorted = (str, n) => {
  if (str.length < n) return str;

  const [firstWord, secondWord] = str.split(' ');

  return `${firstWord}${secondWord ? '…' : ''}`;
};

const titleShorted = computed(() => getShorted(title, 13));
const modelShorted = computed(() => getShorted(model, 6));
</script>

<style lang="scss" scoped>
$item-width: 115px;
$item-width-sm: 120px;
$item-width-md: 165px;
$item-width-lg: 180px;
$item-width-xl: $item-width-lg;
// $item-width-xl: 210px;

.item {
  width: $item-width;
  // height: 140px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: padding();

  position: relative;
  cursor: pointer;

  @include media-up(sm) {
    width: $item-width-sm;
  }

  @include media-up(md) {
    width: $item-width-md;
  }

  @include media-up(lg) {
    width: $item-width-lg;
  }

  @include media-up(xl) {
    width: $item-width-xl;
  }

  img {
    width: $item-width;

    @include media-up(md) {
      width: $item-width-md;
    }

    @include media-up(lg) {
      width: $item-width-lg;
    }

    @include media-up(xl) {
      width: $item-width-xl;
    }
  }

  &__price {
    display: flex;
    gap: padding();
    position: relative;
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

  &__remove {
    margin-left: auto;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    img {
      width: 14px;
      height: 14px;

      @include media-up(xl) {
        width: 21px;
        height: 21px;
      }
    }
  }

  &__new {
    @include rotate;
    font-size: 7px;
    text-transform: uppercase;
    line-height: 1;
    border: 1px solid red;
    position: absolute;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f00;
    // bottom: 78px;
    top: 38px;
    right: 0;

    @include media-up(md) {
      @include font-xxsm;
      top: 48px;
      width: 45px;
      height: 45px;
    }

    @include media-up(xl) {
      @include font-xxsm;
      // bottom: 62px;
      top: 70px;
      width: 50px;
      height: 50px;
    }
  }

  strong {
    // @include font-base;
    // min-height: 32px;
    letter-spacing: $font-letter-spacing-sm;
    color: $font-color-cta;
    font-weight: $font-weight-light;

    font-size: 15px;

    // @include media-up(md) {
    //   @include font-md;
    // }
  }

  em {
    // @include font-sm;
    // min-height: 28px;
    letter-spacing: $font-letter-spacing-xs;
    font-style: normal;
    color: $font-color-muted;

    font-size: 12px;

    // @include media-up(md) {
    //   @include font-base;
    // }
  }

  &__model,
  &__title {
    display: none;

    @include media-up(lg) {
      display: block;
    }

    &--shorted {
      display: block;

      @include media-up(lg) {
        display: none;
      }
    }
  }
}
</style>
