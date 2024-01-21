<template>
  <Pagination
    style="margin-top: 30px"
    :total="glassesStore.SUNGLASSES_LIST.pagination.totalItems"
    :per-page="glassesStore.SUNGLASSES_LIST.pagination.perPage"
  />
</template>

<script setup lang="ts">
import { useGlassesStore } from '~/store/glasses';
import { scrollToGoods } from '~/helpers/scrollToGoods';

const glassesStore = useGlassesStore();
const route = useRoute();

const routePage = computed(() => +(route.query.page || 1) as number);

watch(
  () => route.query.page,
  (page: string) => glassesStore.SET_PAGE(+(page || 1)),
  { immediate: true }
);

watch(
  () => glassesStore.SUNGLASSES_LIST.pagination.page,
  async (page: number) =>
    await navigateTo({
      query: {
        // remove query from route if page is 1
        page: page === 1 ? undefined : page,
      },
    })
);

watch(routePage, scrollToGoods);
</script>
