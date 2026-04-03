import type { WheelItem } from "../../../../types";

type Props = { readonly winner: WheelItem | null };

export function WinnerDisplay({ winner }: Props) {
	return (
		<div class="h-12 flex items-center justify-center">
			{winner && (
				<div
					class="px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg"
					style={{ backgroundColor: winner.color }}
				>
					{winner.label}
				</div>
			)}
		</div>
	);
}
