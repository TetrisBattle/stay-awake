import { app, BrowserWindow, globalShortcut, Menu } from 'electron'
import { stayAwake, stopStayAwake } from './ipc/stayAwake.js'
import { enableDevTools, isDev } from './util.js'
import { getIndexPath, getPreloadPath } from './pathResolver.js'

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

	mainWindow.loadFile(getIndexPath())
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(null)
	enableDevTools()
	createWindow()
	stayAwake()
})

const cleanup = () => {
	if (isDev()) globalShortcut.unregisterAll()
	stopStayAwake()
}

app.on('before-quit', cleanup)
app.on('will-quit', cleanup)
app.on('window-all-closed', cleanup)
process.on('exit', cleanup)
