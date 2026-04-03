import "./AuraLabel.css";

type Props = {
	readonly label: string;
	readonly lx: number;
	readonly ly: number;
	readonly rotation: number;
};

export function AuraLabel({ label, lx, ly, rotation }: Props) {
	return (
		<text
			x={lx}
			y={ly}
			textAnchor="middle"
			dominantBaseline="middle"
			fill="white"
			fontSize="12"
			fontWeight="800"
			stroke="rgba(0,0,0,0.45)"
			strokeWidth="0.8"
			paintOrder="stroke"
			class="AuraLabel"
			transform={`rotate(${rotation}, ${lx}, ${ly})`}
			style="pointer-events:none;user-select:none"
		>
			{label}
		</text>
	);
}
