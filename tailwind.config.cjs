module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				bazar: {
					primary: '#0D9488',
					secondary: '#2563EB',
					accent: '#6366F1',
					neutral: '#475569',
					'base-100': '#334155',
					'base-200': '#1E293B',
					'base-300': '#0F172A',
					info: '#0EA5E9',
					'base-content': '#E2E8F0',
					success: '#059669',

					warning: '#F59E0B',

					error: '#F43F5E'
				},
				bazar2: {
					primary: '#0D9488',
					secondary: '#2563EB',
					accent: '#6366F1',
					neutral: '#475569',
					'base-100': '#334155',
					'base-200': '#1E293B',
					'base-300': '#0F172A',
					info: '#0EA5E9',
					'base-content': '#E2E8F0',
					success: '#059669',

					warning: '#F59E0B',

					error: '#F43F5E'
				}
			}
		]
	}
};
