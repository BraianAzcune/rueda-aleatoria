import { weakHash } from "./weakHash";

export type SliceEffect =
	| "glow"
	| "aura"
	| "comicSans"
	| "nullException"
	| "minecraft"
	| "default";

// Hashes are computed from lowercase trigger words via weakHash().
const EFFECT_MAP: ReadonlyMap<number, SliceEffect> = new Map([
	[3352, "glow"],
	[31192, "aura"],
	[47639, "aura"],
	[49299, "comicSans"],
	[50567, "nullException"],
	[63917, "minecraft"],
]);

export function getEffectForLabel(label: string): SliceEffect {
	const words = label.trim().toLowerCase().split(/\s+/);
	for (const word of words) {
		const effect = EFFECT_MAP.get(weakHash(word));
		if (effect !== undefined) return effect;
	}
	return "default";
}
