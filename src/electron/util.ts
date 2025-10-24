import { BrowserWindow, globalShortcut, ipcMain } from 'electron'

export function isDev(): boolean {
	return process.env.NODE_ENV === 'development'
}

export function enableDevTools() {
	if (isDev()) {
		globalShortcut.register('CommandOrControl+Shift+I', () => {
			const focusedWin = BrowserWindow.getFocusedWindow();
			if (focusedWin) focusedWin.webContents.toggleDevTools();
		});
	}
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
	key: Key,
	handler: (payload: EventPayloadMapping[Key]) => void | Promise<void>,
) {
	ipcMain.handle(key, (_event, payload) => handler(payload))
}
