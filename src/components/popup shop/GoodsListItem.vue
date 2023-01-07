<template>
  <div
    class="item animate__animated animate__zoomIn"
    :class="{ animate__fadeOut: removeOn }"
  >
    <img
      width="150"
      height="73"
      :src="src"
      :alt="`${item.brend} ${item.model}`"
      @click="$emit('open-item')"
    />
    <div class="item-info">
      <div class="item-name">
        <strong class="item-brend">
          {{ item.brend }}
        </strong>
        <strong class="item-model">{{ item.model }} </strong>
      </div>
      <p class="item-price">
        <span>
          <span class="item-coast" :class="{ sale: item.sale }"
            >${{ item.coast }}</span
          >
          <span class="item-old-coast" v-if="item.sale"
            >${{ item.oldCoast }}</span
          >
        </span>
        <svg
          fill="#f00"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          @click="deleteItem"
        >
          <g>
            <polygon
              points="20.3,21.7 12,13.4 3.7,21.7 2.3,20.3 10.6,12 2.3,3.7 3.7,2.3 12,10.6 20.3,2.3 21.7,3.7 13.4,12 21.7,20.3 		"
            />
          </g>
        </svg>
      </p>
    </div>
    <div class="item-actions">
      <!-- <button class="item-buy" @click="$emit('buy-item')">Buy</button> -->
      <div class="item-count">
        <div
          @click="DEC_ITEM_COUNT(item.id)"
          :class="{ disabled: item.count < 2 }"
        >
          -
        </div>
        <span>
          {{ item.count }}
        </span>
        <div
          @click="INC_ITEM_COUNT(item.id)"
          :class="{ disabled: item.count > 8 }"
        >
          +
        </div>
      </div>
      <!-- <button class="item-trash" @click="deleteItem"> -->
      <!-- <svg fill="#f00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M19.45,4.06H15.27v-.5a1.5,1.5,0,0,0-1.5-1.5H10.23a1.5,1.5,0,0,0-1.5,1.5v.5H4.55a.5.5,0,0,0,0,1h.72l.42,14.45a2.493,2.493,0,0,0,2.5,2.43h7.62a2.493,2.493,0,0,0,2.5-2.43l.42-14.45h.72A.5.5,0,0,0,19.45,4.06Zm-9.72-.5a.5.5,0,0,1,.5-.5h3.54a.5.5,0,0,1,.5.5v.5H9.73Zm7.58,15.92a1.5,1.5,0,0,1-1.5,1.46H8.19a1.5,1.5,0,0,1-1.5-1.46L6.26,5.06H17.74Z"
            />
            <path d="M8.375,8h0a.5.5,0,0,1,1,0l.25,10a.5.5,0,0,1-1,0Z" />
            <path d="M15.625,8.007a.5.5,0,0,0-1,0h0l-.25,10a.5.5,0,0,0,1,0Z" />
          </g>
        </svg> -->
      <!-- </button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const vuexActions = {
  INC_ITEM_COUNT: 'cart/INC_ITEM_COUNT',
  DEC_ITEM_COUNT: 'cart/DEC_ITEM_COUNT',
};

export default {
  name: 'GoodsListItem',
  data() {
    return {
      removeOn: false,
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    src() {
      return `${this.pathToImgs}/${this.item.id}/1.jpg`;
    },
  },
  methods: {
    ...mapActions(vuexActions),
    inc() {},
    deleteItem() {
      this.removeOn = true;

      setTimeout(() => {
        this.$emit('delete-item');
      }, 300);
    },
  },
};
</script>

<style scoped src="./PopupShop-styles.css"></style>
