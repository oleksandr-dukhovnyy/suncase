<template>
  <SideModal>
    <div>
      <Filters />
    </div>
  </SideModal>
</template>

<script lang="ts" setup>
import Filters from './Filters.vue';
</script>

<style scoped lang="scss">
.filters {
  padding-right: padding(4);
}
</style>
