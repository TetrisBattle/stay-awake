import { useState } from 'react'
import { PowerSettingsNew as PowerIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

export function App() {
	const [_loggerEnabled, setLoggerEnabled] = useState(false)

	return (
		<Box
			sx={{
				p: 2,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<IconButton
				onClick={() => {
					setLoggerEnabled((prev) => {
						const newState = !prev
						window.electron.toggleStayAwake(newState)
						return newState
					})
				}}
				disableRipple
			>
				<PowerIcon
					color={_loggerEnabled ? 'info' : 'disabled'}
					sx={{ fontSize: 200 }}
				/>
			</IconButton>
		</Box>
	)
}
