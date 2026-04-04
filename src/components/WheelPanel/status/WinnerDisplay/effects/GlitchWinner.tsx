import "./GlitchWinner.css";

type Props = { readonly label: string; };

export function GlitchWinner({ label }: Props) {
	return (
		<div
			class="glitch-winner px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg"
			style={{ backgroundColor: "black" }}
			data-text={label}
		>
			{label}
		</div>
	);
}
