import { useEffect, useState } from "preact/hooks";
import Balatro from "./components/Balatro/Balatro";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import { MobileConfigModal } from "./components/ConfigPanel/MobileConfigModal";
import { FuturePanel } from "./components/FuturePanel/FuturePanel";
import { WheelPanel } from "./components/WheelPanel/WheelPanel";
import { weakHash } from "./components/WheelPanel/wheel/WheelSlice/SliceLabel/weakHash";
import { useWheelStore } from "./store/wheelStore";

const BALATRO_HASHES = new Set([34621, 52979, 4064, 27749, 35829, 2582, 23545]);

export function App() {
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const items = useWheelStore((s) => s.items);
	const showBalatro = items.some((item) =>
		BALATRO_HASHES.has(weakHash(item.label.toLowerCase())),
	);

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
		<div class="relative min-h-screen text-white">
			<div class="fixed inset-0 -z-10">
				{showBalatro ? (
					<>
						<Balatro
							pixelFilter={745}
							mouseInteraction={false}
							isRotate={true}
						/>
						<div class="absolute inset-0 bg-black/30" />
					</>
				) : (
					<div class="h-full w-full bg-gray-900" />
				)}
			</div>
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
