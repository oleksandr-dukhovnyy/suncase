<template>
  <article class="item" data-test="product-card">
    <img
      v-if="useImage"
      :src="image(`${id}/1.jpg`)"
      :alt="`picture of ${model} ${brand}`"
      @click="emit('clicked')"
    />
    <strong @click="emit('clicked')">{{ brand }}</strong>
    <em @click="emit('clicked')">{{ model }}</em>
    <div @click="emit('clicked')" class="item__price">
      <p class="item__coast" :class="sale ? 'item__coast--line-through' : ''">
        ${{ sale ? oldCoast : coast }}
      </p>
      <p v-if="sale" class="item__new-coast">${{ coast }}</p>
    </div>
    <div @click="emit('clicked')" class="item__new" v-if="isNew && useImage">
      new
    </div>
    <div style="display: flex; gap: 10px; position: relative">
      <Counter
        v-if="useCounter"
        class="item__counter"
        :value="count"
        :min="1"
        :max="9"
        @inc="emit('inc-count')"
        @dec="emit('dec-count')"
      />

      <Confirmation
        v-if="useRemoveBtn"
        color="red"
        text="Delete?"
        class="item__remove"
        @click.stop
        @confirm="emit('remove')"
      >
        <div class="item__remove-item">
          <img :src="icon('remove')" alt="X" />
        </div>
      </Confirmation>
    </div>
  </article>
</template>

<script lang="ts" setup>
import Counter from './Counter.vue';

withDefaults(
  defineProps<{
    brand: string;
    model: string;
    coast: number;
    sale: boolean;
    oldCoast: number;
    isNew: boolean;
    id: string;
    count?: number;
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

const emit = defineEmits<{
  (e: 'clicked'): void;
  (e: 'inc-count'): void;
  (e: 'dec-count'): void;
  (e: 'remove'): void;
}>();
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
    position: relative;
  }

  &__coast {
    color: $color-cta;
    line-height: 22px;

    &--line-through {
      text-decoration: line-through;
    }
  }

  &__new-coast {
    color: $color-red;
    line-height: 22px;
  }

  &__remove {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;

    &-item {
      padding: 20px;
      margin-left: 8px;
    }

    img {
      width: 12px;
      height: 12px;
    }
  }

  &__new {
    font-size: 11px;
    @include rotate;
    text-transform: uppercase;
    line-height: 1;
    border: 1px solid red;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-red;
    right: 10px;
    top: 70px;
    width: 50px;
    height: 50px;
    user-select: none;
  }

  strong {
    font-size: 15px;
    letter-spacing: 6.75px;
    color: $color-cta;
    font-weight: 400;
    margin: 0;
    line-height: 22px;
    margin-bottom: 8px;
  }

  em {
    font-style: normal;
    letter-spacing: 5.4px;
    font-size: 12px;
    color: $color-muted;
    margin: 0;
    line-height: 22px;
    margin-bottom: 6px;
  }

  &__counter {
    margin-top: 12px;
  }
}
</style>
