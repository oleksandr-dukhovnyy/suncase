<template>
  <div
    :class="{
      buttons: true,
      active: active || Active,
      activeButton: activeButton || ActiveButtons,
    }"
  >
    <button id="buy" @click="buyIt_(id)">buy</button>
    <button
      @click="openModal_(id)"
      :class="{
        view: true,
      }"
    >
      wiew
    </button>
    <button
      :class="{
        delete: true,
        desktop: true,
      }"
      @click="deleteIt"
    >
      delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: ['id', 'activeButton', 'active'],
  data() {
    return {
      deleteItTouched: false,
      show: 1,
      Active: false,
      ActiveButtons: false,
    };
  },
  methods: {
    deleteIt() {
      this.$emit('deleteIt', this.id);
    },
  },
};
</script>

<style scoped>
.basked {
  opacity: 0.3 !important;
}

.active {
  background-color: rgba(255, 255, 255, 0.9);
  outline: none;
}

.buttons {
  border: 1px solid rgb(0 0 0 / 0%);
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: -105%;
  transition: 0.7s;
  text-align: center;
  z-index: 3;
}

.buttons button {
  border: 1px solid black;
  background-color: transparent;
  outline: none;
  display: block;

  width: 80%;
  margin-left: 10%;
  margin-top: 14px;

  height: 35px;
  line-height: 35px;
  font-size: 9px;
  letter-spacing: 0.45em;

  text-transform: uppercase;

  transition: 0.3s;
  opacity: 0;

  border-radius: 5px;
}

.activeButton button {
  opacity: 1 !important;
}

.activeButton #buy {
  color: rgb(227, 38, 54);
  background-color: transparent;
  border: 1px solid rgb(227, 38, 54);
}

#buy:hover {
  background-color: rgb(227, 38, 54);
  color: white;
  transition: 0.3s;
}

.buttons:hover {
  opacity: 1 !important;
}

.hideBorder {
  border: 1px solid transparent !important;
  transition: none !important;
  background-color: transparent !important;
}
</style>
