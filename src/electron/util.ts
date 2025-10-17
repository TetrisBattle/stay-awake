import { ipcMain } from 'electron'

export function isDev(): boolean {
	return process.env.NODE_ENV === 'development'
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
	key: Key,
	handler: (payload: EventPayloadMapping[Key]) => void | Promise<void>,
) {
	ipcMain.handle(key, (_event, payload) => handler(payload))
}
