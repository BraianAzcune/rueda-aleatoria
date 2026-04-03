import { useWheelStore } from "../../store/wheelStore";
import { ConfigHeader } from "./components/ConfigHeader";
import { ConfigItemsList } from "./components/ConfigItemsList.tsx";

export function ConfigPanel() {
	const items = useWheelStore((s) => s.items);
	const addItem = useWheelStore((s) => s.addItem);
	const removeItem = useWheelStore((s) => s.removeItem);
	const updateColor = useWheelStore((s) => s.updateColor);
	const updateLabel = useWheelStore((s) => s.updateLabel);
	const updatePercentage = useWheelStore((s) => s.updatePercentage);

	return (
		<aside class="w-full max-w-sm p-4 md:p-6">
			<div class="rounded-2xl border border-gray-700 bg-gray-800/80 p-4 shadow-xl backdrop-blur-sm">
				<ConfigHeader />
				<ConfigItemsList
					items={items}
					onColorChange={updateColor}
					onLabelChange={updateLabel}
					onPercentageChange={updatePercentage}
					onRemove={removeItem}
					onAdd={() => addItem("Opcion")}
				/>
			</div>
		</aside>
	);
}
