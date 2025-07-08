import type { ColorData } from '../atoms/types'
import type { ToneObject } from '../molecules/createTone'

// Генерирует типы для базовых цветов (red, green, ...)
// Включает все поля цвета и дополнительные свойства от baseTone (если задан)

type BaseColorKeys<
	Colors extends Record<string, ColorData>,
	Tones extends Record<string, ToneObject<any, any>>
> = {
	[C in keyof Colors]: Colors[C] &
		(Tones[keyof Tones] extends ToneObject<infer R, any> ? R : never)
}

// Генерирует типы для комбинации "цвет + тон" (например, blue_brightness)

type ToneKeys<
	Colors extends Record<string, ColorData>,
	Tones extends Record<string, ToneObject<any, any>>
> = {
	[C in keyof Colors as Tones extends Record<infer T, any>
		? T extends string
			? `${string & C}_${string & Tones[T]['name']}`
			: never
		: never]: Tones extends Record<infer T, any>
		? T extends string
			? Tones[T] extends ToneObject<infer R, any>
				? R
				: never
			: never
		: never
}

// Генерирует типы для комбинации "цвет + подтон + тон" (например, blue_8-bit_depth)

type SubtoneKeys<
	Colors extends Record<string, ColorData>,
	Tones extends Record<string, ToneObject<any, any>>
> = {
	[C in keyof Colors as Tones extends Record<infer T, any>
		? T extends string
			? Tones[T] extends ToneObject<any, infer STs>
				? {
						[ST in keyof STs]: `${string & C}_${string & ST}_${string &
							Tones[T]['name']}`
				  }[keyof STs]
				: never
			: never
		: never]: Tones extends Record<infer T, any>
		? T extends string
			? Tones[T] extends ToneObject<any, infer STs>
				? STs[keyof STs] extends (data: ColorData) => infer RR
					? RR
					: never
				: never
			: never
		: never
}

// Итоговый тип палитры, объединяющий все варианты

export type PaletteResult<
	Colors extends Record<string, ColorData>,
	Tones extends Record<string, ToneObject<any, any>>
> = BaseColorKeys<Colors, Tones> &
	ToneKeys<Colors, Tones> &
	SubtoneKeys<Colors, Tones>

export function createPalette<
	Colors extends Record<string, ColorData>,
	Tones extends Record<string, ToneObject<any, any>>
>(
	colors: Colors,
	options: {
		base?: ToneObject<any, any>
		tones?: Tones
	}
): PaletteResult<Colors, Tones> {
	if (
		!colors ||
		typeof colors !== 'object' ||
		Object.keys(colors).length === 0
	) {
		throw new Error('createPalette: Colors object must be a non-empty object')
	}
	if (options.base && !options.base.__isTone) {
		throw new Error('createPalette: Base must be a valid ToneObject')
	}
	if (options.tones && typeof options.tones !== 'object') {
		throw new Error('createPalette: Tones must be an object')
	}
	for (const toneKey in options.tones || {}) {
		if (!options.tones![toneKey].__isTone) {
			throw new Error(`createPalette: ${toneKey} must be a valid ToneObject`)
		}
		if (!options.tones![toneKey].name) {
			throw new Error(`createPalette: ${toneKey} must have a name property`)
		}
	}

	const result: any = {}

	for (const colorName in colors) {
		if (!colors[colorName] || typeof colors[colorName] !== 'object') {
			throw new Error(`createPalette: Invalid color data for ${colorName}`)
		}
		result[colorName] = { ...colors[colorName] }
		if (options.base) {
			result[colorName] = {
				...result[colorName],
				...options.base.base(colors[colorName]),
			}
		}
	}

	// Цвет + тон, цвет + подтон + тон

	if (options.tones) {
		for (const toneKey in options.tones) {
			const toneObj = options.tones[toneKey]
			const toneName = toneObj.name || toneKey
			for (const colorName in colors) {
				const colorData = colors[colorName]
				result[`${colorName}_${toneName}`] = toneObj.base(colorData)

				if (toneObj.subtone) {
					for (const subKey in toneObj.subtone) {
						if (typeof toneObj.subtone[subKey] !== 'function') {
							throw new Error(
								`createPalette: Invalid subtone function for ${subKey} in ${toneName}`
							)
						}
						result[`${colorName}_${subKey}_${toneName}`] =
							toneObj.subtone[subKey](colorData)
					}
				}
			}
		}
	}

	return result as PaletteResult<Colors, Tones>
}
