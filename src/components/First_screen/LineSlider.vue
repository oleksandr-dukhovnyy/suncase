<template>
  <div class="line">
    <img :src="`./img/LineSlider/${row}/1${format}`" with="407" />

    <div class="browse__button">
      <button class="browse">browse</button>
    </div>

    <img with="458" :src="`./img/LineSlider/${row}/3${format}`" />

    <img :src="`./img/LineSlider/${row}/4${format}`" />
  </div>
</template>

<script>
export default {
  name: 'LineSlider',
  props: ['row', 'browseIndex'],
  data() {
    return {
      imgs: ['1'],
      url1: './img/LineSlider/',
      format: '.jpg',
    };
  },
};
</script>

<style scoped></style>
