<template>
  <Modal @close="$emit('close')">
    <h1>cart</h1>
  </Modal>
</template>

<script setup>
import Modal from '../../General/Modal.vue';

const $emit = defineEmits(['close']);
</script>
