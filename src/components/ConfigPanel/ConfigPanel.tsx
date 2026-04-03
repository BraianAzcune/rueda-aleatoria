import { useWheelStore } from "../../store/wheelStore";
import { ConfigHeader } from "./components/ConfigHeader";
import { ConfigItemsList } from "./components/ConfigItemsList.tsx";

export function ConfigPanel() {
	const items = useWheelStore((s) => s.items);
	const updateColor = useWheelStore((s) => s.updateColor);
	const updateLabel = useWheelStore((s) => s.updateLabel);

	return (
		<aside class="w-full max-w-sm p-4 md:p-6">
			<div class="rounded-2xl border border-gray-700 bg-gray-800/80 p-4 shadow-xl backdrop-blur-sm">
				<ConfigHeader />
				<ConfigItemsList
					items={items}
					onColorChange={updateColor}
					onLabelChange={updateLabel}
				/>
			</div>
		</aside>
	);
}
