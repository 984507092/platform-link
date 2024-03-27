<template>
  <div class="wrapper">
    <ul class="tree">
      <li class="item-tree" v-for="item in link" :key="item.name">
        <div class="tree-title flex items-center" v-if="item.children && item.children.length > 1"
             @click="handleJumpLink(item)">
          <SvgIcon :name="item.icon" width="24" height="24"></SvgIcon>
          <i class="ml-2">{{ item.name }}</i>
        </div>
        <!-- 当只有一个子节点时，直接显示 -->
        <template v-if="item.children && item.children.length == 1">
          <div class="first-children items-center" @click="handleJumpLink(item.children[0])">
            <SvgIcon :name="item.icon" width="24" height="24"></SvgIcon>
            <i class="ml-2"> {{ item.children[0].name }}</i>
          </div>
        </template>
        <!-- 当有多个子节点时，依旧使用递归组件 -->
        <ul class="item-tree-children" v-else-if="item.children && item.children.length > 1">
          <li class="item-tree-children-child" v-for="child in item.children" :key="child.name"
              @click="handleJumpLink(child)">
            <tree-item :node="child"></tree-item>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import treeItem from '@/components/tree/treeItem.vue'
import SvgIcon from '@/components/svgIcon/svg.vue'
import type {LinkNodeType} from '@/types/tree'
// import {flatToTree} from '@/utils'
import data from "@/config"

// 输入框传的参数
const props = withDefaults(defineProps<{
  search: string
}>(), {
  search: ''
})

// 假设这是你的数据
const link: Ref<LinkNodeType[]> = ref([]);

/**
 * 监听搜索框的值改变，并更新链接与滚动行为
 * @param {string} key - 搜索关键字，来自父组件传递的props
 */
watch(() => props.search, (key: string) => {
  // 根据搜索关键字过滤数据，并更新link的值
  // console.log(data,'data')
  link.value = data.filter(book => book.name.toUpperCase().includes(key.toUpperCase()))
  // 平滑滚动到页面顶部
  window.scrollTo({
    top: 0, // 滚动到页面顶部
    behavior: "smooth", // 使用平滑滚动方式
  })
})

function handleJumpLink(data: LinkNodeType): void {
  window.open(data.link)
}

onMounted(() => {
  link.value = data
})
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  box-sizing: border-box;
}

.tree {
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;

  .item-tree {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: pointer;
    border-bottom: 1px solid #eeeeee;

    .tree-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
    }

    .first-children {
      width: calc(100% - 10px);
      height: 40px;
      line-height: 40px;
      display: flex;
      box-sizing: content-box;
      padding: 5px;
    }
  }


  .item-tree:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.item-tree-children {
  width: calc(100% - 20px);
  box-sizing: border-box;
  padding: 10px 0 0 15px;

  .item-tree-children-child {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 5px 5px;
  }
}

.item-tree .first-children:hover,
.item-tree-children .item-tree-children-child:hover {
  color: skyblue;
  transition: all 0.3s;
  border-radius: 8px;
  background-color: #cccccc0f;
  box-sizing: content-box;
}
</style>
