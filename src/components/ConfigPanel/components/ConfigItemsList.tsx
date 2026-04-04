import type { WheelItem } from "../../../types";
import { ConfigItemRow } from "./ConfigItemRow";

type ConfigItemsListProps = Readonly<{
	items: WheelItem[];
	onColorChange: (id: string, color: string) => void;
	onLabelChange: (id: string, label: string) => void;
	onPercentageChange: (id: string, percentage: number) => void;
	onRemove: (id: string) => void;
	onAdd: () => void;
	onResetProbabilities: () => void;
}>;

export function ConfigItemsList({
	items,
	onColorChange,
	onLabelChange,
	onPercentageChange,
	onRemove,
	onAdd,
	onResetProbabilities,
}: ConfigItemsListProps) {
	return (
		<section>
			<div class="mb-2 flex items-center justify-between">
				<p class="text-xs uppercase tracking-[0.2em] text-gray-500">
					Opciones actuales
				</p>
				<button
					type="button"
					class="rounded-lg border border-gray-600 bg-gray-900/60 px-2 py-0.5 text-xs text-gray-400 transition hover:border-amber-400 hover:text-amber-300"
					onClick={onResetProbabilities}
					title="Igualar probabilidades"
				>
					Igualar %
				</button>
			</div>
			{items.length === 0 ? (
				<div class="rounded-xl border border-dashed border-gray-600 p-4 text-sm text-gray-400">
					No hay opciones cargadas en el store.
				</div>
			) : (
				<ul class="space-y-2">
					{items.map((item) => (
						<ConfigItemRow
							key={item.id}
							item={item}
							onColorChange={onColorChange}
							onLabelChange={onLabelChange}
							onPercentageChange={onPercentageChange}
							onRemove={onRemove}
						/>
					))}
				</ul>
			)}
			<button
				type="button"
				class="mt-3 w-full rounded-xl border border-gray-600 bg-gray-900/60 px-3 py-2 text-sm font-medium text-gray-100 transition hover:border-indigo-400 hover:text-indigo-300"
				onClick={onAdd}
			>
				+ Agregar opcion
			</button>
		</section>
	);
}
