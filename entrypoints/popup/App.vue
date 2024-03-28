<template>
  <div w-full h-full flex-col relative>
    <div class="catalogue-link" pb-40px>
      <catalogue :search></catalogue>
    </div>
    <div class="search-box flex flex-align">
      <input type="text" v-model="search" placeholder-font-size-14px placeholder="请输入搜索内容"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import catalogue from "@/entrypoints/view/catalogue.vue"

const search = ref('')

</script>

<style scoped lang="scss">
.search-box {
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: #e6eaf2;
  width: 100%;
  height: 32px;
  padding-bottom: 2px;
}

.search-box input {
  text-align: center;
  font-size: 20px;
  color: #333;
  background: #eee;
  width: 100%;
  margin: 0;
  height: 32px;
  border: 1px solid #eee;
  border-radius: 0;
}

.search-box input:focus-visible {
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 0 !important;
  outline: none;
}
</style>
