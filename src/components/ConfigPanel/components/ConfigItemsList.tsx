import type { WheelItem } from "../../../types";
import { ConfigItemRow } from "./ConfigItemRow";

type ConfigItemsListProps = Readonly<{
	items: WheelItem[];
	onColorChange: (id: string, color: string) => void;
	onLabelChange: (id: string, label: string) => void;
}>;

export function ConfigItemsList({
	items,
	onColorChange,
	onLabelChange,
}: ConfigItemsListProps) {
	if (items.length === 0) {
		return (
			<div class="rounded-xl border border-dashed border-gray-600 p-4 text-sm text-gray-400">
				No hay opciones cargadas en el store.
			</div>
		);
	}

	return (
		<section>
			<p class="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
				Opciones actuales
			</p>
			<ul class="space-y-2">
				{items.map((item) => (
					<ConfigItemRow
						key={item.id}
						item={item}
						onColorChange={onColorChange}
						onLabelChange={onLabelChange}
					/>
				))}
			</ul>
		</section>
	);
}
