import type { SliceEffect } from "./effectRegistry";
import { getEffectForLabel } from "./effectRegistry";
import { AuraLabel } from "./effects/AuraLabel";
import { ComicSansLabel } from "./effects/ComicSansLabel";
import { DefaultLabel } from "./effects/DefaultLabel";
import { GlowLabel } from "./effects/GlowLabel";

type Props = {
	readonly label: string;
	readonly lx: number;
	readonly ly: number;
	readonly rotation: number;
};

export function SliceLabel({ label, lx, ly, rotation }: Props) {
	const effect: SliceEffect = getEffectForLabel(label);

	switch (effect) {
		case "glow":
			return <GlowLabel label={label} lx={lx} ly={ly} rotation={rotation} />;
		case "aura":
			return <AuraLabel label={label} lx={lx} ly={ly} rotation={rotation} />;
		case "comicSans":
			return (
				<ComicSansLabel label={label} lx={lx} ly={ly} rotation={rotation} />
			);
		default:
			return <DefaultLabel label={label} lx={lx} ly={ly} rotation={rotation} />;
	}
}
