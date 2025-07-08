import { describe, it, expect } from 'vitest'
import { createTone } from '../molecules/createTone'
import { createPalette } from '../organisms/createPalette'
import { baseColors } from '../atoms/colors'
import type { ColorData } from '../atoms/types'

describe('createTone', () => {
	it('should create a tone object with correct structure', () => {
		const testTone = createTone(
			(data: ColorData) => ({
				main: data.main,
				contrast: data.dark,
			}),
			{
				name: 'testTone',
				subtone: {
					light: (data: ColorData) => ({ light: data.light }),
				},
			}
		)

		expect(testTone).toHaveProperty('__isTone', true)
		expect(testTone).toHaveProperty('name', 'testTone')
		expect(typeof testTone.base).toBe('function')
		expect(testTone.subtone).toHaveProperty('light')
	})
})

describe('createPalette', () => {
	const tone = createTone(
		(data: ColorData) => ({
			foreground: data.main,
		}),
		{
			name: 'tone',
			subtone: {
				sub: (data: ColorData) => ({ white: data.light }),
			},
		}
	)

	const palette = createPalette(baseColors, {
		tones: { tone },
	})

	it('should contain base colors', () => {
		expect(palette).toHaveProperty('red')
		expect(palette.red.main).toBe('red')
	})

	it('should contain color_tone keys', () => {
		expect(palette).toHaveProperty('blue_tone')
		expect(palette.blue_tone.foreground).toBe('blue')
	})

	it('should contain color_subtone_tone keys', () => {
		expect(palette).toHaveProperty('blue_sub_tone')
		expect(palette.blue_sub_tone.white).toBe('lightblue')
	})
})
