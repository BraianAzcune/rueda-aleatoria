import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import { FuturePanel } from "./components/FuturePanel/FuturePanel";
import { WheelPanel } from "./components/WheelPanel/WheelPanel";

export function App() {
	return (
		<div class="flex min-h-screen bg-gray-900 text-white">
			{/* panel izquierdo — reservado para historial u otras vistas */}
			<div class="flex-1 flex justify-end">
				<FuturePanel />
			</div>

			{/* zona central */}
			<div class="flex items-center justify-center">
				<WheelPanel />
			</div>

			{/* panel derecho */}
			<div class="flex-1 flex justify-end">
				<ConfigPanel />
			</div>
		</div>
	);
}
