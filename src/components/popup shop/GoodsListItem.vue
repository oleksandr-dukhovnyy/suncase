<template>
  <div
    class="item animate__animated animate__zoomIn"
    :class="{ animate__fadeOut: removeOn }"
  >
    <img
      width="150"
      :src="src"
      :alt="`${item.brend} ${item.model}`"
      @click="$emit('open-item')"
    />
    <!-- height="73" -->
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

      <svg
        fill="#e32636"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        @click="showDeletionConfirmation = true"
      >
        <g>
          <polygon
            points="20.3,21.7 12,13.4 3.7,21.7 2.3,20.3 10.6,12 2.3,3.7 3.7,2.3 12,10.6 20.3,2.3 21.7,3.7 13.4,12 21.7,20.3"
          />
        </g>
      </svg>
    </div>
    <div
      v-if="showDeletionConfirmation"
      @click.stop
      class="item-delete-confirmation animate__animated animate__fadeIn"
    >
      <strong> Delete it? </strong>
      <div class="item-delete-confirmation__controlls">
        <button @click="deleteItem">Yes</button>
        <button @click="showDeletionConfirmation = false">No</button>
      </div>
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
      showDeletionConfirmation: false,
      timeout: null,
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
  watch: {
    showDeletionConfirmation(n) {
      if (n === true) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          this.showDeletionConfirmation = false;
        }, 3000);
      }
    },
  },
  methods: {
    ...mapActions(vuexActions),
    deleteItem() {
      // this.removeOn = true;

      // setTimeout(() => {
      //   this.$emit('delete-item');
      // }, 300);

      this.$emit('delete-item');
    },
  },
};
</script>

<style scoped src="./PopupShop-styles.css"></style>
