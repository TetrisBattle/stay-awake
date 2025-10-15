import { app, BrowserWindow } from 'electron'
import path from 'node:path'

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	})

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:5555')
		return
	}

	mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'))
})
