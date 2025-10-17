import { ipcMain } from 'electron'

let tickInterval: NodeJS.Timeout | null = null

export function registerLoggerHandler() {
	ipcMain.handle('toggle-logger', (_event, enabled) => {
		if (enabled) {
			console.log('Logger started...')
			tickInterval = setInterval(() => {
				console.log('tick')
			}, 1000)
		} else {
			console.log('Logger stopped.')
			if (tickInterval) clearInterval(tickInterval)
		}
	})
}
