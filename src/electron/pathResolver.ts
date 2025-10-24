import { app } from 'electron'
import path from 'node:path'
import { isDev } from './util.js'

function getBasePath(): string {
	return path.join(app.getAppPath(), isDev() ? '.' : '..')
}

export function getPreloadPath(): string {
	return path.join(
		getBasePath(),
		'/dist-electron/preload.cjs',
	)
}

export function getIndexPath(): string {
	return path.join(
		getBasePath(),
		'/dist-react/index.html',
	)
}
