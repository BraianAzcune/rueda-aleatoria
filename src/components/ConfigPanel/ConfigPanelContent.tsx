import { useWheelStore } from "../../store/wheelStore";
import { ConfigHeader } from "./components/ConfigHeader";
import { ConfigItemsList } from "./components/ConfigItemsList";

type ConfigPanelContentProps = Readonly<{
	className?: string;
	showHeader?: boolean;
}>;

export function ConfigPanelContent({
	className = "",
	showHeader = true,
}: ConfigPanelContentProps) {
	const items = useWheelStore((s) => s.items);
	const addItem = useWheelStore((s) => s.addItem);
	const removeItem = useWheelStore((s) => s.removeItem);
	const updateColor = useWheelStore((s) => s.updateColor);
	const updateLabel = useWheelStore((s) => s.updateLabel);
	const updatePercentage = useWheelStore((s) => s.updatePercentage);

	return (
		<div
			class={`rounded-2xl border border-gray-700 bg-gray-800/80 p-4 shadow-xl backdrop-blur-sm ${className}`.trim()}
		>
			{showHeader ? <ConfigHeader /> : null}
			<ConfigItemsList
				items={items}
				onColorChange={updateColor}
				onLabelChange={updateLabel}
				onPercentageChange={updatePercentage}
				onRemove={removeItem}
				onAdd={() => addItem("Opcion")}
			/>
		</div>
	);
}
