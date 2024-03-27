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
        <template v-if="item.children && item.children.length === 1">
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
import SvgIcon from '../../components/svgIcon/svg.vue'
import type { LinkNodeType } from '@/types/tree'
import { flatToTree } from '@/utils'

const data: LinkNodeType[] = [
  { "name": "ES6相关", "link": "https://es6.ruanyifeng.com/", "icon": "es6", "parentName": null },
  { "name": "ES6", "link": "https://es6.ruanyifeng.com/", "icon": "es6", "parentName": "ES6相关" },
  { "name": "Vue全套", "link": "https://cn.vuejs.org/", "icon": "vue", "parentName": null },
  { "name": "Vue", "link": "https://cn.vuejs.org/", "icon": "vue", "parentName": "Vue全套" },
  { "name": "Vue-router", "link": "https://router.vuejs.org/installation.html", "icon": "vue", "parentName": "Vue全套" },
  { "name": "React全套", "link": "https://zh-hans.react.dev/", "icon": "react", "parentName": null },
  { "name": "React", "link": "https://zh-hans.react.dev/", "icon": "react", "parentName": "React全套" },
  { "name": "React Native中文网", "link": "https://reactnative.cn/", "icon": "react", "parentName": "React全套" },
  { "name": "uniapp相关", "link": "https://uniapp.dcloud.net.cn/", "icon": "uniapp", "parentName": null },
  { "name": "uniapp", "link": "https://uniapp.dcloud.net.cn/", "icon": "uniapp", "parentName": "uniapp相关" },
  { "name": "小程序", "link": "https://uniapp.dcloud.net.cn/", "icon": "miniprogram", "parentName": null },
  { "name": "微信小程序", "link": "https://developers.weixin.qq.com/miniprogram/dev/framework/", "icon": "miniprogram", "parentName": "小程序" },
  { "name": "支付宝小程序", "link": "https://opendocs.alipay.com/mini", "icon": "miniprogram", "parentName": "小程序" },
  { "name": "Node", "link": "https://zh-hans.react.dev/", "icon": "nodejs", "parentName": null },
  { "name": "Node 中文文档", "link": "https://zh-hans.react.dev/", "icon": "nodejs", "parentName": "Node" },
  { "name": "Node 英文文档", "link": "https://nodejs.org/en", "icon": "nodejs", "parentName": "Node" },
  { "name": "Nest", "link": "https://nestjs.com/", "icon": "nestjs", "parentName": null },
  { "name": "Nest英文文档", "link": "https://nestjs.com/", "icon": "nestjs", "parentName": "Nest" },
  { "name": "Nest中文文档", "link": "https://www.nestjs.com.cn/", "icon": "nestjs", "parentName": "Nest" },
  { "name": "nuxt", "link": "https://v2.nuxt.com/", "icon": "nuxt", "parentName": null },
  { "name": "nuxt英文文档", "link": "https://v2.nuxt.com/", "icon": "nuxt", "parentName": "nuxt" },
  { "name": "WXT相关", "link": "https://wxt.dev/", "icon": "pluginmanagement", "parentName": null },
  { "name": "WXT", "link": "https://wxt.dev/", "icon": "pluginmanagement", "parentName": "WXT相关" },
  { "name": "MDN", "link": "https://developer.mozilla.org/zh-CN/docs/Learn", "icon": "mdnwebdocs", "parentName": null }
]

// 假设这是你的数据
const link: Ref<LinkNodeType[]> = ref([]);

function handleJumpLink(data: LinkNodeType): void {
  window.open(data.link)
}

onMounted(() => {
  link.value = flatToTree(data)
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
