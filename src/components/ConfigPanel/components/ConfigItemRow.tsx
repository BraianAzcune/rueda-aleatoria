import type { WheelItem } from "../../../types";
import { ColorPicker } from "../../ColorPicker/ColorPicker";
import { EditableLabel } from "./EditableLabel";

type ConfigItemRowProps = Readonly<{
	item: WheelItem;
	onColorChange: (id: string, color: string) => void;
	onLabelChange: (id: string, label: string) => void;
}>;

function formatNumber(value: number): string {
	return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export function ConfigItemRow({
	item,
	onColorChange,
	onLabelChange,
}: ConfigItemRowProps) {
	return (
		<li class="rounded-xl border border-gray-700 bg-gray-900/60 p-3">
			<div class="flex items-center gap-3">
				<div class="min-w-0 flex-1">
					<EditableLabel
						value={item.label}
						onChange={(label) => onLabelChange(item.id, label)}
					/>
				</div>
				<p class="text-sm font-medium text-gray-100">
					{formatNumber(item.percentage)}%
				</p>
				<ColorPicker
					value={item.color}
					onChange={(color) => onColorChange(item.id, color)}
					ariaLabel={`Color para ${item.label}`}
				/>
			</div>
		</li>
	);
}
