import type { WheelItem } from "../../../types";
import { ColorPicker } from "../../ColorPicker/ColorPicker";
import { EditableLabel } from "./EditableLabel";
import { PercentageEditor } from "./PercentageEditor";

type ConfigItemRowProps = Readonly<{
	item: WheelItem;
	onColorChange: (id: string, color: string) => void;
	onLabelChange: (id: string, label: string) => void;
	onPercentageChange: (id: string, percentage: number) => void;
	onRemove: (id: string) => void;
}>;

export function ConfigItemRow({
	item,
	onColorChange,
	onLabelChange,
	onPercentageChange,
	onRemove,
}: ConfigItemRowProps) {
	return (
		<li class="flex items-stretch gap-2">
			<div class="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/60 p-3">
				<div class="min-w-0 flex-1">
					<EditableLabel
						value={item.label}
						onChange={(label) => onLabelChange(item.id, label)}
					/>
				</div>
				<PercentageEditor
					value={item.percentage}
					onChange={(percentage) => onPercentageChange(item.id, percentage)}
				/>
				<ColorPicker
					value={item.color}
					onChange={(color) => onColorChange(item.id, color)}
					ariaLabel={`Color para ${item.label}`}
				/>
			</div>
			<button
				type="button"
				class="rounded-xl border border-red-500/40 px-2 text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
				title={`Eliminar ${item.label}`}
				aria-label={`Eliminar ${item.label}`}
				onClick={() => onRemove(item.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="h-4 w-4"
					aria-hidden="true"
				>
					<path d="M3 6h18" />
					<path d="M8 6V4h8v2" />
					<path d="M19 6l-1 14H6L5 6" />
					<path d="M10 11v6" />
					<path d="M14 11v6" />
				</svg>
			</button>
		</li>
	);
}
