import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { MuiThemeProvider } from './theme/MuiThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</StrictMode>,
)
