import { useEffect } from "preact/hooks";
import { ConfigPanelContent } from "./ConfigPanelContent";

type MobileConfigModalProps = Readonly<{
	open: boolean;
	onClose: () => void;
}>;

export function MobileConfigModal({ open, onClose }: MobileConfigModalProps) {
	useEffect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			class="fixed inset-0 z-50 flex items-end px-3 pb-3 pt-8 lg:hidden"
			role="dialog"
			aria-modal="true"
			aria-labelledby="mobile-config-title"
		>
			<button
				type="button"
				class="absolute inset-0 bg-black/70"
				aria-label="Cerrar configuracion"
				onClick={onClose}
			/>
			<div class="relative max-h-[85dvh] w-full overflow-hidden rounded-3xl border border-gray-700 bg-gray-900 shadow-2xl">
				<div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
					<div>
						<h2
							id="mobile-config-title"
							class="text-base font-semibold text-white"
						>
							Configuracion
						</h2>
						<p class="text-sm text-gray-400">Edita las opciones de la ruleta</p>
					</div>
					<button
						type="button"
						class="rounded-full border border-gray-600 px-3 py-1.5 text-sm text-gray-200 transition hover:border-gray-400 hover:text-white"
						onClick={onClose}
					>
						Cerrar
					</button>
				</div>

				<div class="overflow-y-auto px-3 py-3">
					<ConfigPanelContent
						className="border-none bg-transparent p-1 shadow-none backdrop-blur-none"
						showHeader={false}
					/>
				</div>
			</div>
		</div>
	);
}
