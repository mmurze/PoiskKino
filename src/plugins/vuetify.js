import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'dark'
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	display: {
		mobileBreakpoint: 'sm',
		thresholds: {
			xs: 0,
			sm: 340,
			md: 520,
			lg: 720,
			xl: 1200,
		},
	},
	components,
	directives,
})
export  default vuetify
