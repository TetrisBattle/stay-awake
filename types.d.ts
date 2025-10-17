/* biome-ignore-all lint/correctness/noUnusedVariables: true */

interface Window {
	electron: {
		toggleKeepalive: (enabled: boolean) => Promise<void>
		toggleLogger: (enabled: boolean) => void
	}
}
