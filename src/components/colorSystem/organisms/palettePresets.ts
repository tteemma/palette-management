import { baseColors } from '../atoms/colors'
import {
	baseTone,
	brightness,
	contrast,
	depths,
} from '../molecules/tonePresets'
import { createPalette } from './createPalette'

// Собирает итоговую палитру приложения из базовых цветов и набора тонов

export const appPalette = createPalette(baseColors, {
	base: baseTone,
	tones: { brightness, depth: depths },
})

export const appPaletteContrast = createPalette(baseColors, {
	base: baseTone,
	tones: { brightness, depth: depths, contrast },
})

//фух работает =)
