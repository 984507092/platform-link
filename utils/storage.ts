import {storage} from 'wxt/storage';
import type {LinkNodeType} from '@/types/tree'

enum typeItem {
	local = "local",
	session = "session",
	sync = "sync",
	managed = "managed",
}

export async function getItem(name: string, type: string = "local"): LinkNodeType[] {
	return await storage.getItem(`${typeItem[type]}:${name}`)
}

export async function setItem<T>(name: string, data: T, type: string = "local"): void {
	await storage.setItem(`${typeItem[type]}:${name}`, data)
}

export async function removeItem(name: string, type: string = "local"): void {
	await storage.removeItem(`${typeItem[type]}:${name}`)
}

//对象
export async function getMeta(name: string, type: string = "local"): LinkNodeType[] {
	return await storage.getMeta(`${typeItem[type]}:${name}`)
}

export async function setMeta<T>(name: string, data: T, type: string = "local"): void {
	await storage.setMeta(`${typeItem[type]}:${name}`, data)
}

export async function removeMeta(name: string, type: string = "local"): void {
	await storage.removeMeta(`${typeItem[type]}:${name}`)
}