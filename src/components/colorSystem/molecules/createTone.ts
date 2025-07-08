import type { ToneCallback, SubtonesConfig } from '../atoms/types'

// Опции для создания тона: имя тона, подтоны

interface ToneOptions<_, ST extends SubtonesConfig<any> = {}> {
	name?: string
	subtone?: ST
}

// Тип тона: хранит имя, основную функцию и объект подтонов (если есть)

export type ToneObject<R, ST extends SubtonesConfig<any>> = {
	__isTone: true
	name?: string
	base: ToneCallback<R>
	subtone?: ST
}

// Фабрика для создания тона или подтона. Гарантирует типобезопасность и корректность структуры
// Используется для создания любого тона (base, brightness, depths и т.д.)

export function createTone<R, ST extends SubtonesConfig<any> = {}>(
	base: ToneCallback<R>,
	options?: ToneOptions<R, ST>
): ToneObject<R, ST> {
	if (!base || typeof base !== 'function') {
		throw new Error('createTone: Base callback must be a function')
	}
	if (options?.subtone && typeof options.subtone !== 'object') {
		throw new Error('createTone: Subtone must be an object if provided')
	}
	return {
		__isTone: true,
		name: options?.name,
		base,
		subtone: options?.subtone,
	}
}
