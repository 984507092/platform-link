import type { LinkNodeType } from '@/types/tree';

export function flatToTree(nodes: LinkNodeType[]): LinkNodeType[] {
  const tree: LinkNodeType[] = [];
  const map: { [key: string]: LinkNodeType } = {};

  // 创建一个映射，以节点的name作为键
  for (const node of nodes) {
    map[node.name] = node;
  }

  // 构建树状结构
  for (const node of nodes) {
    if (node.parentName) {
      // 如果当前节点有父节点，将其添加到父节点的children数组中
      if (map[node.parentName]) {
        if (!map[node.parentName].children) {
          map[node.parentName].children = [];
        }
        map[node.parentName].children!.push(node);
      }
    } else {
      // 如果当前节点没有父节点，将其添加到树数组中
      tree.push(node);
    }
  }

  return tree;
}
