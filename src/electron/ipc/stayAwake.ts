import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { ipcMainHandle } from '../util.js'

let psProcess: ChildProcessWithoutNullStreams | null = null

export function stayAwake() {
	ipcMainHandle('stayAwake', (enabled) => {
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

export function stopStayAwake() {
	if (psProcess) {
		psProcess.kill()
		psProcess = null
	}
}
