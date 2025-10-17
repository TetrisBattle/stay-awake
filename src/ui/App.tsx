import { useState } from 'react'

export function App() {
	const [_loggerEnabled, setLoggerEnabled] = useState(false)

	return (
		<div>
			<button
				onClick={() => {
					setLoggerEnabled((prev) => {
						const newState = !prev
						window.electron.toggleLogger(newState)
						return newState
					})
				}}
			>
				Toggle Logger
			</button>
		</div>
	)
}
