import { app, type BrowserWindow, Menu, Tray } from 'electron'
import { getIconPath } from './pathResolver.js'

export function createTray(mainWindow: BrowserWindow) {
	const tray = new Tray(getIconPath())

	tray.setToolTip('Stay Awake')

	tray.on('double-click', () => {
		if (mainWindow.isVisible()) {
			mainWindow.hide()
			if (app.dock) app.dock.hide()
		} else {
			mainWindow.show()
			if (app.dock) app.dock.show()
		}
	})

	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: 'Quit',
				click: () => app.quit(),
			},
		]),
	)
}
