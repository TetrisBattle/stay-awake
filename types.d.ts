/* biome-ignore-all lint/correctness/noUnusedVariables: true */

interface Window {
	electron: {
		toggleStayAwake: (enabled: boolean) => Promise<void>
	}
}

type EventPayloadMapping = {
	stayAwake: boolean
}
