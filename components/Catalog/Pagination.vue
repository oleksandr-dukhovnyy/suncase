<template>
  <div class="pagination">
    <div v-for="(page, i) in pages" :key="i">
      <NuxtLink
        v-if="page.type === 'page'"
        :to="page.to"
        class="pagination__item pagination__item--link"
        :class="{
          'pagination__item--active': page.active,
        }"
      >
        {{ page.label }}
      </NuxtLink>
      <div v-else class="pagination__item">
        {{ page.label }}
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import generatePagination, { buildPage } from '~/helpers/generatePagination';

const props = withDefaults(
  defineProps<{
    total: number;
    perPage?: number;
    offset?: number;
    queryName?: string;
  }>(),
  {
    perPage: 8,
    offset: 2,
    queryName: 'page',
  }
);

const route = useRoute();
const pages = computed(() => {
  if (props.total <= props.perPage) return [];

  const totalPages = Math.ceil(props.total / props.perPage);
  const currentPage = +route.query[props.queryName] || 1;
  const offset = props.offset;

  return generatePagination(currentPage, offset, totalPages).map((page) =>
    buildPage(page, props.queryName)
  );
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: center;
  width: max-content;
  margin: 0 auto;
  padding-top: 12px;

  // border-top: 1px solid $color-muted;
  transition: 1s;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;

    // width: 65px;
    width: 170px;
    height: 43px;
    border-radius: 12px;
    color: $color-muted;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    text-decoration: none;
    cursor: default;
    user-select: none;
    transition: 0.3s;

    &--link {
      cursor: pointer;
      user-select: auto;

      &,
      &:hover,
      &:active {
        // outline: none;
        // font-size: 16px;
        // text-decoration: none;
        // transform: scale(1.05);

        display: flex;
        justify-content: center;
        align-items: center;
        height: 43px;
        padding: 8px 16px;
        border: 1px solid #000;
        border: 1px solid $color-muted;
        border-radius: 6px;
        background-color: transparent;

        // // border: 1px solid $color-black;
        // border: 1px solid $color-muted;

        // // border: 1px solid $color-cta;

        // // border: 1px solid #ffc12f;
        // border-radius: 6px;

        // // color: $color-cta;
        // // color: $color-black;

        color: $color-muted;

        // color: $color-cta;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        letter-spacing: 0.45em;
        text-transform: uppercase;
        cursor: pointer;
      }

      &.pagination__item--active {
        // border: 4px solid #ffc12f;
        // background-color: rgb(255, 243, 17);
        // color: $color-black;

        border: 1px solid #000;
        color: $color-cta;
      }
    }
  }
}
</style>
