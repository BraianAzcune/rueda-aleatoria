import {
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
} from "@floating-ui/react-dom";
import { useCallback, useId, useRef, useState } from "preact/hooks";
import { useClickOutside } from "../../hooks/useClickOutside";

const DEFAULT_PRESET_COLORS = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#84cc16",
	"#22c55e",
	"#10b981",
	"#06b6d4",
	"#0ea5e9",
	"#3b82f6",
	"#6366f1",
	"#8b5cf6",
	"#a855f7",
	"#ec4899",
	"#f43f5e",
] as const;

type ColorPickerProps = Readonly<{
	value: string;
	onChange: (color: string) => void;
	presets?: readonly string[];
	disabled?: boolean;
	ariaLabel?: string;
}>;

function normalizeColor(value: string): string {
	const trimmed = value.trim();
	const validHex = /^#[0-9a-fA-F]{6}$/;
	return validHex.test(trimmed) ? trimmed : "#3b82f6";
}

export function ColorPicker({
	value,
	onChange,
	presets = DEFAULT_PRESET_COLORS,
	disabled = false,
	ariaLabel = "Seleccionar color",
}: ColorPickerProps) {
	const pickerId = useId().replaceAll(":", "");
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setOpen(false), []);

	useClickOutside({
		enabled: open,
		ref: containerRef,
		onOutsideClick: close,
	});

	const { refs, floatingStyles } = useFloating({
		placement: "bottom-end",
		strategy: "fixed",
		middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate,
	});
	const normalizedValue = normalizeColor(value);

	return (
		<div ref={containerRef} class="relative" data-color-picker="true">
			<button
				ref={refs.setReference}
				type="button"
				disabled={disabled}
				class="flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-full border border-white/25"
				aria-label={ariaLabel}
				aria-expanded={open}
				aria-controls={`color-picker-${pickerId}`}
				onClick={() => setOpen((prev) => !prev)}
			>
				<span
					class="h-5 w-5 rounded-full"
					style={{ backgroundColor: normalizedValue }}
				/>
			</button>
			{open && (
				<div
					ref={refs.setFloating}
					id={`color-picker-${pickerId}`}
					class="z-20 w-56 rounded-xl border border-gray-700 bg-gray-900 p-3 shadow-2xl"
					style={floatingStyles}
				>
					<p class="text-xs uppercase tracking-wider text-gray-400">
						Paleta recomendada
					</p>
					<div class="mt-2 grid grid-cols-7 gap-2">
						{presets.map((color) => {
							const isActive =
								color.toLowerCase() === normalizedValue.toLowerCase();

							return (
								<button
									type="button"
									key={color}
									disabled={disabled}
									class={`h-6 w-6 rounded-full border transition ${
										isActive
											? "border-white ring-2 ring-white/50"
											: "border-white/20 hover:border-white/60"
									}`}
									style={{ backgroundColor: color }}
									onClick={() => onChange(color)}
									aria-label={`Usar color ${color}`}
								/>
							);
						})}
					</div>

					<div class="mt-3 border-t border-gray-700 pt-3">
						<p class="mb-1 text-xs uppercase tracking-wider text-gray-400">
							Personalizado
						</p>
						<input
							type="color"
							value={normalizedValue}
							disabled={disabled}
							onInput={(event) => onChange(event.currentTarget.value)}
							class="h-8 w-full cursor-pointer rounded border border-gray-700 bg-transparent"
							aria-label="Elegir color personalizado"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
