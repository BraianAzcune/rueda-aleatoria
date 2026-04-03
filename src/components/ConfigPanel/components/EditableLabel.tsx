import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useClickOutside } from "../../../hooks/useClickOutside";

type EditableLabelProps = Readonly<{
	value: string;
	onChange: (value: string) => void;
}>;

export function EditableLabel({ value, onChange }: EditableLabelProps) {
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!editing) setDraft(value);
	}, [value, editing]);

	function startEditing() {
		setDraft(value);
		setEditing(true);
	}

	const commit = useCallback(() => {
		const trimmed = draft.trim();
		if (trimmed && trimmed !== value) {
			onChange(trimmed);
		} else {
			setDraft(value);
		}
		setEditing(false);
	}, [draft, value, onChange]);

	useClickOutside({
		enabled: editing,
		ref: containerRef,
		onOutsideClick: commit,
	});

	return (
		<div ref={containerRef}>
			{editing ? (
				<input
					// biome-ignore lint/a11y/noAutofocus: intencional al activar edición
					autoFocus
					class="w-full truncate rounded bg-gray-700 px-1.5 py-0.5 text-sm font-medium text-gray-100 outline-none ring-1 ring-indigo-500 focus:ring-2"
					value={draft}
					onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
					onBlur={commit}
					onKeyDown={(e) => {
						if (e.key === "Enter") commit();
						if (e.key === "Escape") {
							setDraft(value);
							setEditing(false);
						}
					}}
				/>
			) : (
				<button
					type="button"
					class="w-full truncate text-left text-sm font-medium text-gray-100 hover:text-indigo-300"
					title="Haz clic para editar"
					onClick={startEditing}
				>
					{value}
				</button>
			)}
		</div>
	);
}
