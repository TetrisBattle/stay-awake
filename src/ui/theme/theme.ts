import { createTheme, ThemeOptions } from '@mui/material'
import { defaultTheme } from './defaultTheme'
import { deepmerge } from '@mui/utils'

const customTheme: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#BB86FC',
		},
		secondary: {
			main: '#03DAC6',
		},
		text: {
			primary: '#E2E2E2',
		},
	},
}

export const theme = createTheme(deepmerge(defaultTheme, customTheme))
