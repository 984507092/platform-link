<template>
  <div w-full h-full flex-col>
    <div class="catalogue-link" pb-32px>
      <catalogue></catalogue>
    </div>
    <div h-40px fixed bottom-0 w-320px style="background: #333">
      <input w-full h-full class="search-input" type="text" v-model="search" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import catalogue from "../view/catalogue.vue"

const search = ref('')
</script>

<style scoped>
.search-input:focus-visible {
  font-size: 18px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 0!important;
  outline: none;
}
</style>
