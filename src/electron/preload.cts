const electron = require('electron')
const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
	toggleKeepalive: (enabled) =>
		ipcRenderer.invoke('toggle-keepalive', enabled),
	toggleLogger: (enabled) => ipcRenderer.invoke('toggle-logger', enabled),
} satisfies Window['electron'])
