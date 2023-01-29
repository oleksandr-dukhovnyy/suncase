<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i"
      @click="selected(item.name)"
      :class="item.active ? 'active' : ''"
    >
      {{ item.title }} ({{ +item.active }})
    </li>
  </ul>
</template>

<script setup>
const { items, type } = defineProps({
  items: {
    type: Array,
  },
  type: {
    type: String,
  },
});

const $emit = defineEmits(['selected']);

const selected = (name) => {
  $emit('selected', { value: name, type });
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
