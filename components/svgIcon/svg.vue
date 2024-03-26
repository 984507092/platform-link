<template>
  <svg
      aria-hidden="true"
      :width="width"
      :height="height"
      :fill="color"
  >
    <use :xlink:href="`#icon-${name}`"/>
  </svg>
</template>
<script setup lang="ts">
defineProps<{
  name: string,
  width: string,
  height: string,
  color?: string
}>();
</script>
