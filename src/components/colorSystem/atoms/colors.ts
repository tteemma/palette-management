import type { InputModel } from './types'

// Исходная палитра базовых цветов. Каждый цвет полностью описан по всем параметрам.
// Эта структура расширяема: сюда можно добавить новые цвета.

export const baseColors: InputModel = {
	red: { main: 'red', dark: 'darkred', light: 'lightred', extra: 'extrared' },
	green: {
		main: 'green',
		dark: 'darkgreen',
		light: 'lightgreen',
		extra: 'extragreen',
	},
	blue: {
		main: 'blue',
		dark: 'darkblue',
		light: 'lightblue',
		extra: 'extrablue',
	},
	yellow: {
		main: 'yellow',
		dark: 'darkyellow',
		light: 'lightyellow',
		extra: 'extrayellow',
	},
}
