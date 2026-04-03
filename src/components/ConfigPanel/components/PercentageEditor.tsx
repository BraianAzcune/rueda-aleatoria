import { useCallback, useRef, useState } from "preact/hooks";
import { useClickOutside } from "../../../hooks/useClickOutside";

type PercentageEditorProps = Readonly<{
	value: number;
	onChange: (value: number) => void;
}>;

function formatNumber(value: number): string {
	return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export function PercentageEditor({ value, onChange }: PercentageEditorProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setOpen(false);
	}, []);

	useClickOutside({
		enabled: open,
		ref: containerRef,
		onOutsideClick: close,
	});

	return (
		<div ref={containerRef} class="relative">
			<button
				type="button"
				class="rounded-md px-2 py-1 text-sm font-medium text-gray-100 transition hover:text-indigo-300"
				title="Haz clic para ajustar porcentaje"
				onClick={() => setOpen((prev) => !prev)}
			>
				{formatNumber(value)}%
			</button>

			{open ? (
				<div class="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-gray-700 bg-gray-800 p-3 shadow-xl">
					<label class="block text-xs uppercase tracking-wide text-gray-400">
						<span class="mb-2 block">Porcentaje</span>
						<input
							type="range"
							min={1}
							max={100}
							step={0.1}
							value={value}
							onInput={(e) =>
								onChange(Number((e.target as HTMLInputElement).value))
							}
							class="w-full accent-indigo-400"
							aria-label="Editar porcentaje"
						/>
					</label>
					<p class="mt-2 text-right text-xs text-gray-300">
						{formatNumber(value)}%
					</p>
				</div>
			) : null}
		</div>
	);
}
