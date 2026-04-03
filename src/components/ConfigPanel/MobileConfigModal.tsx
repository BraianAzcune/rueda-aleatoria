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
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);

	if (!open) return null;

	return (
		<div
			class="fixed inset-0 z-50 lg:hidden"
			role="dialog"
			aria-modal="true"
			aria-labelledby="mobile-config-title"
		>
			<div class="flex h-full w-full flex-col bg-gray-900">
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

				<div class="min-h-0 flex-1 overflow-y-auto px-3 py-3">
					<ConfigPanelContent
						className="min-h-full rounded-none border-none bg-transparent p-1 shadow-none backdrop-blur-none"
						showHeader={false}
					/>
				</div>
			</div>
		</div>
	);
}
