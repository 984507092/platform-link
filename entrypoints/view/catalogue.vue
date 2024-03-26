<template>
  <div class="wrapper">
    <ul class="tree">
      <li class="item-tree" v-for="item in link" :key="item.name">
        <div class="tree-title flex items-center" v-if="item.children && item.children.length > 1" @click="handleJumpLink(item)">
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
          <li class="item-tree-children-child" v-for="child in item.children" :key="child.name" @click="handleJumpLink(child)">
            <tree-item :node="child"></tree-item>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue';
import treeItem from '@/components/tree/treeItem.vue'
import SvgIcon from '../../components/svgIcon/svg.vue'

// 假设这是你的数据
const link = ref([
  {
    name: 'Vue全套',
    link: 'https://cn.vuejs.org/',
    icon: "vue",
    children: [
      {
        name: 'Vue',
        icon: "vue",
        link: 'https://cn.vuejs.org/',
        children: []
      },
      {
        name: 'Vue-router',
        icon: "vue",
        link: 'https://router.vuejs.org/installation.html',
        children: []
      },
    ]
  },
  {
    name: 'React大全',
    icon: "react",
    link: 'https://zh-hans.react.dev/',
    children: [
      {
        name: 'React',
        icon: "react",
        link: 'https://zh-hans.react.dev/',
        children: []
      },
      {
        name: 'React Native中文网',
        icon: "react",
        link: 'https://reactnative.cn/',
        children: []
      },
    ]
  },
  {
    name: 'uniapp',
    icon: "uniapp",
    link: 'https://uniapp.dcloud.net.cn/',
    children: [
      {
        name: 'uniapp',
        icon: "uniapp",
        link: 'https://uniapp.dcloud.net.cn/',
        children: []
      },
    ]
  },
  {
    name: 'Node',
    icon: "nodejs",
    link: 'https://zh-hans.react.dev/',
    children: [
      {
        name: 'Node',
        icon: "nodejs",
        link: 'https://zh-hans.react.dev/',
        children: []
      }
    ]
  },
  {
    name: 'Nest',
    icon: "nestjs",
    link: 'https://nestjs.com/',
    children: [
      {
        name: 'Nest英文文档',
        icon: "nestjs",
        link: 'https://nestjs.com/',
        children: []
      },
      {
        name: 'Nest中文文档',
        icon: "nestjs",
        link: 'https://www.nestjs.com.cn/',
        children: []
      }
    ]
  }
]);

function handleJumpLink(data: object): void {
  window.open(data.link)
}
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

    .first-children:hover {
      color: red;
      background-color: #cccccc;
      box-sizing: content-box;
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

.item-tree-children .item-tree-children-child:hover {
  color: red;
  background-color: #cccccc;
  box-sizing: content-box;

}
</style>