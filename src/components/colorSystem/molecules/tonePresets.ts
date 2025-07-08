import { createTone } from './createTone'
import type { ColorData } from '../atoms/types'

export const baseTone = createTone((data: ColorData) => ({
	background: data.main,
	color: data.main,
}))

export const brightness = createTone(
	(data: ColorData) => ({
		foreground: data.main,
		customProp: '#f0f0f0',
	}),
	{
		name: 'brightness',
		subtone: {
			low: (data: ColorData) => ({ white: data.light }),
			medium: (data: ColorData) => ({ shadow: data.main }),
			high: (data: ColorData) => ({
				someProp: 'transparent',
				anotherProp: '#fff',
				thirdCustomProp: data.main,
			}),
			ultra: (data: ColorData) => ({ intensive: data.extra }),
		},
	}
)

export const depths = createTone(
	(data: ColorData) => ({
		background: data.light,
		foreground: data.main,
		color: data.extra,
	}),
	{
		name: 'depth',
		subtone: {
			'8-bit': (data: ColorData) => ({ borderColor: data.main }),
			'16-bit': (data: ColorData) => ({
				borderColor: data.main,
				anotherColor: data.light,
			}),
			'24-bit': (data: ColorData) => ({ extraColor: data.extra }),
		},
	}
)

export const contrast = createTone(
	(data: ColorData) => ({
		bgContrast: data.dark,
		fgContrast: data.light,
		border: data.main,
	}),
	{
		name: 'contrast',
		subtone: {
			high: (data: ColorData) => ({ highValue: data.extra }),
			low: (data: ColorData) => ({ lowValue: data.light }),
		},
	}
)
