import { useEffect, useState } from "preact/hooks";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import { MobileConfigModal } from "./components/ConfigPanel/MobileConfigModal";
import { FuturePanel } from "./components/FuturePanel/FuturePanel";
import { WheelPanel } from "./components/WheelPanel/WheelPanel";

export function App() {
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	useEffect(() => {
		const mediaQuery = globalThis.matchMedia("(min-width: 1024px)");

		function handleChange(event: MediaQueryListEvent) {
			if (event.matches) {
				setIsConfigOpen(false);
			}
		}

		mediaQuery.addEventListener("change", handleChange);
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return (
		<div class="min-h-screen bg-gray-900 text-white">
			<div class="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-6 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
				{/* panel izquierdo — reservado para historial u otras vistas */}
				<div class="hidden lg:flex lg:flex-1 lg:justify-end">
					<FuturePanel />
				</div>

				{/* zona central */}
				<div class="flex flex-col items-center gap-4">
					<WheelPanel />
					<button
						type="button"
						class="w-full rounded-2xl border border-indigo-400/50 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-100 transition hover:border-indigo-300 hover:bg-indigo-500/20 lg:hidden"
						onClick={() => setIsConfigOpen(true)}
					>
						Configurar
					</button>
				</div>

				{/* panel derecho */}
				<div class="hidden lg:flex lg:flex-1 lg:justify-end">
					<ConfigPanel />
				</div>
			</div>

			<MobileConfigModal
				open={isConfigOpen}
				onClose={() => setIsConfigOpen(false)}
			/>
		</div>
	);
}
