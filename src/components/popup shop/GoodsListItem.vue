<template>
  <div class="item">
    <img
      width="150"
      height="73"
      :src="src"
      :alt="`${item.brend} ${item.model}`"
    />
    <div class="item-info">
      <div class="item-name">
        <strong class="item-brend">
          {{ item.brend }}
        </strong>
        <strong class="item-model">{{ item.model }} </strong>
      </div>
      <p class="item-price">
        <span class="item-coast" :class="{ sale: item.sale }"
          >${{ item.coast }}</span
        >
        <span class="item-old-coast" v-if="item.sale"
          >${{ item.oldCoast }}</span
        >
      </p>
    </div>
    <div class="item-actions">
      <button class="item-buy">buy</button>
      <button class="item-trash">
        <svg fill="#f00" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M19.45,4.06H15.27v-.5a1.5,1.5,0,0,0-1.5-1.5H10.23a1.5,1.5,0,0,0-1.5,1.5v.5H4.55a.5.5,0,0,0,0,1h.72l.42,14.45a2.493,2.493,0,0,0,2.5,2.43h7.62a2.493,2.493,0,0,0,2.5-2.43l.42-14.45h.72A.5.5,0,0,0,19.45,4.06Zm-9.72-.5a.5.5,0,0,1,.5-.5h3.54a.5.5,0,0,1,.5.5v.5H9.73Zm7.58,15.92a1.5,1.5,0,0,1-1.5,1.46H8.19a1.5,1.5,0,0,1-1.5-1.46L6.26,5.06H17.74Z"
            />
            <path d="M8.375,8h0a.5.5,0,0,1,1,0l.25,10a.5.5,0,0,1-1,0Z" />
            <path d="M15.625,8.007a.5.5,0,0,0-1,0h0l-.25,10a.5.5,0,0,0,1,0Z" />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
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
};
</script>

<style scoped>
.item {
  width: 150px;
  display: grid;
  /* grid-template-columns: 1fr; */
  grid-template-rows: 73px 140px 40px;
}

.item * {
  letter-spacing: 0.25em;
  font-weight: 300;
}

.item-actions {
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-gap: 8px;
}

.item-name {
  display: flex;
  flex-direction: column;
}

.item-brend {
  color: #0878ff;
  font-size: 15px;
}

.item-old-coast {
  color: #f00;
  text-decoration: line-through;
}

.item-coast {
  color: #0878ff;
  font-weight: 700;
}

.item-price {
  display: flex;
  flex-direction: column;
}

.item-model {
  color: #999;
  font-size: 12px;
}

.item-actions svg {
  width: 30px;
  height: 30px;
}

button,
.item-actions button:hover,
.item-actions button:active {
  background-color: transparent;
  border: none;
}

.item-trash {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-buy {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
