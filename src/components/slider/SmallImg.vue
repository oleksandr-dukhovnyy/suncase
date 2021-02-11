<template>
  <img
        v-bind:src="imgPath + id + '.jpg'"
        alt="pict"
        class="small-img"
        v-bind:class="{ active: isActive, smallImg: true }"
        @click="openIt"
    >
</template>
<script>
export default {
    name: 'SmallImg',
    props: ['imgPath', 'id', 'isActive'],
    methods: {
        openIt(){
            this.$emit( 'openIt', this.id );
        }
    },
}
</script>

<style scoped>
    .small-img {
        max-height: 67px;
        max-width: 136px;
        height: 100%;
    }
</style>