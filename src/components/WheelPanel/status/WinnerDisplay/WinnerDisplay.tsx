import type { WheelItem } from "../../../../types";
import type { SliceEffect } from "../../wheel/WheelSlice/SliceLabel/effectRegistry";
import { getEffectForLabel } from "../../wheel/WheelSlice/SliceLabel/effectRegistry";
import { DefaultWinner } from "./effects/DefaultWinner";
import { GlitchWinner } from "./effects/GlitchWinner";

type Props = { readonly winner: WheelItem | null };

function WinnerBadge({ winner }: { readonly winner: WheelItem }) {
	const effect: SliceEffect = getEffectForLabel(winner.label);
	const label =
		effect === "nullException" ? "NullPointerException" : winner.label;

	switch (effect) {
		case "nullException":
			return <GlitchWinner label={label} />;
		default:
			return <DefaultWinner label={label} color={winner.color} />;
	}
}

export function WinnerDisplay({ winner }: Props) {
	return (
		<div class="h-12 flex items-center justify-center">
			{winner && <WinnerBadge winner={winner} />}
		</div>
	);
}
