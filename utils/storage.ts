import {storage} from 'wxt/storage';
import type {LinkNodeType} from '@/types/tree'

enum typeItem {
    local = "local",
    session = "session",
    sync = "sync",
    managed = "managed",
}

type NodeType = "local" | "session" | "sync" | "managed"

async function getItem(name: string, type: NodeType = "local"): Promise<LinkNodeType[] | null> {
    return  await storage.getItem(`${typeItem[type]}:${name}`)
}

async function setItem<T>(name: string, data: T, type: NodeType = "local"): Promise<void> {
    await storage.setItem(`${typeItem[type]}:${name}`, data)
}

async function removeItem(name: string, type: NodeType = "local"): Promise<void> {
    await storage.removeItem(`${typeItem[type]}:${name}`)
}

//对象
async function getMeta(name: string, type: NodeType = "local"): Promise<LinkNodeType[] | any> {
    return await storage.getMeta(`${typeItem[type]}:${name}`)
}

async function setMeta<T>(name: string, data: T, type: NodeType = "local"): Promise<void> {
    await storage.setMeta(`${typeItem[type]}:${name}`, data)
}

async function removeMeta(name: string, type: NodeType = "local"): Promise<void> {
    await storage.removeMeta(`${typeItem[type]}:${name}`)
}

export {
    removeMeta,
    setMeta,
    getMeta,
    getItem,
    setItem,
    removeItem
}