import { app } from 'electron'
import path from 'node:path'
import { isDev } from './util.js'

function getBasePath(): string {
	return path.join(app.getAppPath(), isDev() ? '.' : '..')
}

export function getPreloadPath(): string {
	return path.join(getBasePath(), '/dist-electron/preload.cjs')
}

export function getUIPath(): string {
	return path.join(getBasePath(), '/dist-react/index.html')
}

function getAssetsPath(): string {
	return path.join(getBasePath(), '/src/assets')
}

export function getIconPath(): string {
	return path.join(getAssetsPath(), 'logo.ico')
}
