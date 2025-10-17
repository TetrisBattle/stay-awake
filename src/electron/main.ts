import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { registerKeepAliveHandler } from './ipc/keepAliveHandler.js'
import { registerLoggerHandler } from './ipc/loggerHandler.js'
import { isDev } from './util.js'
import { getPreloadPath } from './pathResolver.js'

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: getPreloadPath(),
		},
	})

	if (isDev()) {
		mainWindow.loadURL('http://localhost:5555')
		return
	}

	mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'))
}

app.whenReady().then(() => {
	createWindow()
	registerKeepAliveHandler()
	registerLoggerHandler()
})
