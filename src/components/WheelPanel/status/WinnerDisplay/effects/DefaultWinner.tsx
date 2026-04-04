type Props = { readonly label: string; readonly color: string };

export function DefaultWinner({ label, color }: Props) {
	return (
		<div
			class="px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg"
			style={{ backgroundColor: color }}
		>
			{label}
		</div>
	);
}
