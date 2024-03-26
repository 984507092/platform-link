<template>
  <li class="children-item">
    <div class="flex items-center">
      <SvgIcon :name="node.icon" width="24" height="24"></SvgIcon>
      <i class="ml-2"> {{ node.name }}</i>
    </div>
    <ul v-if="node.children && node.children.length > 0">
      <tree-item v-for="child in node.children" :key="child.name" :node="child"></tree-item>
    </ul>
  </li>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/svg.vue";
import type { LinkTreeNode } from '@/types/tree'

defineProps<{
  node: LinkTreeNode
}>()
</script>
<style scoped lang="scss">
li {
  width: 100%;
}
</style>
