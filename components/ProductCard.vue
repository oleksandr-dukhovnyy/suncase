<template>
  <article class="item">
    <img
      v-if="useImage"
      :src="image(`${id}/1.jpg`)"
      alt="sunglasses picture"
      @click="$emit('clicked')"
    />
    <strong @click="$emit('clicked')">{{ brand }}</strong>
    <em @click="$emit('clicked')">{{ model }}</em>
    <div @click="$emit('clicked')" class="item__price">
      <p class="item__coast" :class="sale ? 'item__coast--line-through' : ''">
        ${{ sale ? oldCoast : coast }}
      </p>
      <p v-if="sale" class="item__new-coast">${{ coast }}</p>
      <Confirmation
        v-if="useRemoveBtn"
        color="red"
        :text="'Delete?'"
        class="item__remove"
        @click.stop
        @confirm="$emit('remove')"
      >
        <div class="item__remove-item">
          <img :src="icon('remove')" alt="X" />
        </div>
      </Confirmation>
    </div>
    <div @click="$emit('clicked')" class="item__new" v-if="isNew && useImage">
      new
    </div>
    <Counter
      v-if="useCounter"
      class="item__counter"
      :value="count"
      :min="1"
      :max="9"
      @inc="emit('inc-count')"
      @dec="emit('dec-count')"
    />
  </article>
</template>

<script lang="ts" setup>
// @ts-ignore
import Counter from './Counter.vue';

const image = (relativeImgPath: string): string => `./img/${relativeImgPath}`;
const icon = (name: string, ext = 'svg'): string =>
  `./img/icons/${name}.${ext}`;

withDefaults(
  defineProps<{
    brand: string; // 'item.brand';
    model: string; //'item.model';
    coast: number; // 'item.coast';
    sale: boolean; // 'item.sale';
    oldCoast: number; //'item.oldCoast';
    isNew: boolean; //'item.isNew';
    id: string; // 'item.id';
    count?: number; //'item.count';
    useImage?: boolean;
    useCounter?: boolean;
    useRemoveBtn?: boolean;
  }>(),
  {
    useImage: true,
    useCounter: false,
    useRemoveBtn: false,
    count: 0,
  }
);

const emit = defineEmits(['clicked', 'inc-count', 'dec-count', 'remove']);
</script>

<style lang="scss" scoped>
.item {
  width: 200px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0;
  position: relative;
  cursor: pointer;

  img {
    width: 200px;
    height: 98px;
    margin-bottom: 3px;
  }

  &__price {
    display: flex;
    gap: padding();

    letter-spacing: 5.4px;
    font-weight: 400;
    font-size: 14px;
  }

  &__coast {
    color: $font-color-cta;
    line-height: 22px;

    &--line-through {
      text-decoration: line-through;
    }
  }

  &__new-coast {
    color: $font-color-red;
    line-height: 22px;
  }

  &__remove {
    position: absolute;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    bottom: 20px;
    right: 20px;

    img {
      width: 12px;
      height: 12px;
    }
  }

  &__new {
    @include font-xxsm;
    @include rotate;
    text-transform: uppercase;
    line-height: 1;
    border: 1px solid red;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-color-red;
    right: 10px;
    top: 70px;
    width: 50px;
    height: 50px;
    user-select: none;
  }

  strong {
    font-size: 15px;
    letter-spacing: 6.75px;
    color: $font-color-cta;
    font-weight: 400;
    margin: 0;
    line-height: 22px;
    margin-bottom: 8px;
  }

  em {
    font-style: normal;
    letter-spacing: 5.4px;
    font-size: 12px;
    color: #999;
    margin: 0;
    line-height: 22px;
    margin-bottom: 6px;
  }

  &__counter {
    margin-top: 10px;
  }
}
</style>