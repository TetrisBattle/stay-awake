import { app, BrowserWindow, Menu } from 'electron'
import path from 'node:path'
import { stayAwake } from './ipc/stayAwake.js'
import { isDev } from './util.js'
import { getPreloadPath } from './pathResolver.js'

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 360,
		height: 360,
		resizable: isDev(),
		webPreferences: {
			preload: getPreloadPath(),
		},
	})

	if (isDev()) {
		mainWindow.loadURL('http://localhost:5555')
		return
	}

	mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
}

app.whenReady().then(() => {
	if (!isDev()) Menu.setApplicationMenu(null)
	createWindow()
	stayAwake()
})
