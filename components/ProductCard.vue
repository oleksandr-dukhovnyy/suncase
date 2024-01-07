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
    <div
      v-if="useRemoveBtn || useCounter"
      style="position: relative; display: flex; gap: 10px"
    >
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
        :text="t('cart.delete-item')"
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

const { t } = useLocator();
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: flex-start;
  width: 200px;
  cursor: pointer;

  img {
    width: 200px;
    height: 98px;
    margin-bottom: 3px;
  }

  &__price {
    position: relative;
    display: flex;
    gap: padding();
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 5.4px;
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
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    &-item {
      margin-left: 8px;
      padding: 20px;
    }

    img {
      width: 12px;
      height: 12px;
    }
  }

  &__new {
    position: absolute;
    top: 70px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid red;
    border-radius: 50%;
    color: $color-red;
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    user-select: none;

    @include rotate;
  }

  strong {
    margin: 0;
    margin-bottom: 8px;
    color: $color-cta;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 6.75px;
  }

  em {
    margin: 0;
    margin-bottom: 6px;
    color: $color-muted;
    font-size: 12px;
    font-style: normal;
    line-height: 22px;
    letter-spacing: 5.4px;
  }

  &__counter {
    margin-top: 12px;
  }
}
</style>
