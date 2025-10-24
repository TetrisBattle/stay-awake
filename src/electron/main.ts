import { app, BrowserWindow, globalShortcut, Menu } from 'electron'
import { stayAwakeHandler, stopStayAwake } from './ipc/stayAwake.js'
import { enableDevTools, isDev } from './util.js'
import { getUIPath, getPreloadPath, getIconPath } from './pathResolver.js'
import { createTray } from './tray.js'

function createWindow(): BrowserWindow {
	const mainWindow = new BrowserWindow({
		width: 360,
		height: 360,
		icon: getIconPath(),
		resizable: isDev(),
		webPreferences: {
			preload: getPreloadPath(),
		},
	})

	if (isDev()) mainWindow.loadURL('http://localhost:5555')
	else mainWindow.loadFile(getUIPath())

	return mainWindow
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(null)
	enableDevTools()
	const mainWindow = createWindow()
	createTray(mainWindow)
	handleCloseEvents(mainWindow)

	stayAwakeHandler()
})

process.on('exit', () => {
	if (isDev()) globalShortcut.unregisterAll()
	stopStayAwake()
})

function handleCloseEvents(mainWindow: BrowserWindow) {
	let willClose = false

	mainWindow.on('close', (event) => {
		if (willClose) return

		event.preventDefault()
		mainWindow.hide()
		if (app.dock) app.dock.hide()
	})

	app.on('before-quit', () => {
		willClose = true
	})

	mainWindow.on('show', () => {
		willClose = false
	})
}
