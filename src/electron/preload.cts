const electron = require('electron')
const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
	toggleStayAwake: (enabled) =>
		ipcRenderer.invoke('stayAwake', enabled),
} satisfies Window['electron'])
