import type { WheelItem } from "../../../types";
import { ColorPicker } from "../../ColorPicker/ColorPicker";
import { EditableLabel } from "./EditableLabel";
import { PercentageEditor } from "./PercentageEditor";

type ConfigItemRowProps = Readonly<{
	item: WheelItem;
	onColorChange: (id: string, color: string) => void;
	onLabelChange: (id: string, label: string) => void;
	onPercentageChange: (id: string, percentage: number) => void;
}>;

export function ConfigItemRow({
	item,
	onColorChange,
	onLabelChange,
	onPercentageChange,
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
		</li>
	);
}
