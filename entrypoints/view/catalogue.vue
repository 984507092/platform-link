<template>
  <div class="wrapper">
    <ul class="tree">
      <draggable item-key="drag-base" tag="li" :force-fallback="true" :list="link" :sort="true" @end="onEnd" @start="onStart">
        <template #item="{ element }">
          <ul :class="isOpen ? 'is_open' : ''" @contextmenu="onContextMenu($event, element)" :key="element.link">
            <!-- <li class="item-tree" v-for="item in link" :key="item.name">-->
            <li class="item-tree">
              <div v-if="element.children && element.children.length > 1" class="tree-title flex items-center" :key="element.link"
                @click="handleJumpLink(element)">
                <div class="transition">
                  <SvgIcon :name="element.icon" height="24" width="24"></SvgIcon>
                </div>
                <i class="ml-2">{{ element.name }}</i>
              </div>

              <!-- 当只有一个子节点时，直接显示 -->
              <div v-if="element.children && element.children.length == 1" :key="element.link">
                <div class="first-children items-center" @click="handleJumpLink(element.children[0])">
                  <SvgIcon :name="element.icon" height="24" width="24"></SvgIcon>
                  <i class="ml-2"> {{ element.children[0].name }}</i>
                </div>
              </div>

              <!-- 当有多个子节点时，依旧使用递归组件 -->
              <li v-else-if="element.children && element.children.length > 1" class="item-tree-children">
                <draggable :item-key="`drag-${element.name}`" tag="ul" :class="isOpen ? 'hidden' : ''":force-fallback="true" :list="element.children" :sort="true" @end="onEndChild" @start="onStartChild">
                  <!-- <li class="item-tree-children-child" v-for="child in element.children" :key="child.name" @click="handleJumpLink(child)">-->
                  <template #item="{ element }">
                    <li class="item-tree-children-child" @click="handleJumpLink(element)" :key="element.link">
                      <tree-item :node="element"></tree-item>
                    </li>
                  </template>
                </draggable>
              </li>
            </li>
          </ul>
        </template>
      </draggable>
    </ul>
  </div>

  <Dialog :form="newArr" :title="title" :showDialog="isShowDialog" @close="close" @confirm="confirm"></Dialog>
</template>

<script lang="ts" setup>
import treeItem from '@/components/tree/treeItem.vue'
import SvgIcon from '@/components/svgIcon/svg.vue'
import type { LinkNodeType } from '@/types/tree'
import data from "@/config"
import { getItem, setItem } from "@/utils/storage"; // 存储
import draggable from "vuedraggable"; // 拖拽
import ContextMenu from '@imengyu/vue3-context-menu' // 右键菜单
import Dialog from "@/components/dialog/dialog.vue"

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
  link.value = handleSearchResult(key)
  // 平滑滚动到页面顶部
  window.scrollTo({
    top: 0, // 滚动到页面顶部
    behavior: "smooth", // 使用平滑滚动方式
  })
})

// 处理搜索
function handleSearchResult(key: string): LinkNodeType[] {
  // 去除输入框中的空格
  const trimmedKey = key.trim();

  // 如果搜索关键字为空，则直接返回原始数据
  if (!trimmedKey) {
    return data;
  }

  // 进行去重
  const filteredData = new Set<any>();

  // 遍历每个项目
  data.forEach(item => {
      console.log("🚀 ~ handleSearchResult ~ item:", item)
    // 去除当前项目的 name 中的空格
    const itemNameWithoutSpace = item.name.replace(/\s+/g, '');

    // 检查当前项目是否匹配搜索关键字
    if (itemNameWithoutSpace.toUpperCase().includes(trimmedKey.toUpperCase())) {
      // 如果匹配，则将当前项目添加到结果中
      filteredData.add(item);
    }

    // 检查子项目
    if (item.children) {
      // 遍历子项目
      item.children.forEach(child => {
        // 去除子项目的 name 中的空格
        const childNameWithoutSpace = child.name.replace(/\s+/g, '');
        // 检查子项目是否匹配搜索关键字
        if (childNameWithoutSpace.toUpperCase().includes(trimmedKey.toUpperCase())) {
          // 如果匹配，则将父项目添加到结果中
          filteredData.add(item);
        }
      });
    }
  });


  // 将 Set 转换为数组并返回
  return Array.from(filteredData);
}

// 跳转链接
function handleJumpLink(data: LinkNodeType): void {
  window.open(data.link)
}

// 开始拖拽就关闭展开
const isOpen: Ref<boolean> = ref(false)
//父级拖拽开始的事件
const onStart = () => {
  isOpen.value = !isOpen.value
  console.log('onStart')
};

//父级拖拽结束的事件
const onEnd = () => {
  isOpen.value = !isOpen.value
  setItem('link', JSON.stringify(link.value))
  console.log('onEnd')
};

//子级拖拽开始的事件
const onStartChild = () => {
  console.log('startChild')
}
//子级拖拽结束的事件
const onEndChild = () => {
  setItem('link', JSON.stringify(link.value))
  console.log('endChild')
}


// 弹窗
let isShowDialog: Ref<boolean> = ref(false)
let title: Ref<boolean> = ref(true)

// 确认
function confirm(data: LinkNodeType) {
  isShowDialog.value = false
}

// 取消
function close() {
  isShowDialog.value = false
}

// 右键新增 编辑 删除
function onContextMenu(e: MouseEvent, data: LinkNodeType) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    theme: 'mac dark',
    checked: true,
    items: [
      {
        label: "新增",
        onClick: () => {
          isShowDialog.value = true
          title.value = true
        }
      },
      {
        label: "编辑",
        onClick: () => {
          isShowDialog.value = true
          title.value = false
        }
      },
      {
        label: "删除",
        onClick: () => {

        }
      },
    ]
  });
}

// 处理数据和兼容数据
async function formatData() {
  let result = await getItem('link')
  link.value = result && JSON.parse(result).length > 0 ? JSON.parse(result).map((item: LinkNodeType, index: number) => {
    return {
      ...item,
      id: index + new Date().valueOf(),
      children: item.children && item.children.length > 0 ? item.children.map((i, index) => {
        return {
          ...i,
          id: new Date().valueOf() * Math.random() * 10
        }
      }) : []
    }
  }) : data.map((item, index) => {
    return {
      ...item,
      id: index + new Date().valueOf(),
      children: item.children && item.children.length > 0 ? item.children.map((i, index) => {
        return {
          ...i,
          id: new Date().valueOf() * Math.random() * 10
        }
      }) : []
    }
  })
}

onMounted(() => {
  formatData()
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-width: 260px;
  min-height: 100vh;
  box-sizing: border-box;
}

.tree {
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;
}

.is_open {
  width: 100%;
  height: 40px;
  overflow: hidden;
  margin-bottom: 10px;
}

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
  -webkit-transition: all .5s ease;
  border-radius: 8px;
  background-color: #cccccc0f;
  box-sizing: content-box;
}
</style>
