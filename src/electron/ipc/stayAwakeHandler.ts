import { ipcMain } from 'electron'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'

let psProcess: ChildProcessWithoutNullStreams | null = null

export function registerStayAwakeHandler() {
	ipcMain.handle('stayAwake', (_event, enabled) => {
		if (enabled) {
			psProcess = spawn('powershell', [
				'-ExecutionPolicy',
				'Bypass',
				'-Command',
				`
        while ($true) {
          $wsh = New-Object -ComObject WScript.Shell
          $numLockState = [console]::NumberLock
          $wsh.SendKeys("{NUMLOCK}")
          Start-Sleep -Milliseconds 200
          if ($numLockState -ne [console]::NumberLock) { $wsh.SendKeys("{NUMLOCK}") }
          Start-Sleep -Seconds 240
        }
      `,
			])
		} else {
			psProcess?.kill()
			psProcess = null
		}
	})
}
