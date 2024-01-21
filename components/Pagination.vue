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
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding-top: 12px;
  transition: 1s;

  @include media-up(md) {
    flex-direction: row;
    gap: 48px;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 43px;
        padding: 8px 16px;
        border: 1px solid #000;
        border: 1px solid $color-muted;
        border-radius: 6px;
        background-color: transparent;
        color: $color-muted;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        letter-spacing: 0.45em;
        text-transform: uppercase;
        cursor: pointer;
      }

      &.pagination__item--active {
        border: 1px solid #000;
        color: $color-cta;
      }
    }
  }
}
</style>
