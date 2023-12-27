<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const defaultTitle = 'Suncase';

useHead({
  titleTemplate: (titleChunk = defaultTitle) => {
    return titleChunk !== defaultTitle
      ? `${titleChunk} | ${defaultTitle}`
      : defaultTitle;
  },
});
</script>
