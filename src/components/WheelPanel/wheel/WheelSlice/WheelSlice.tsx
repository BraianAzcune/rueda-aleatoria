import type { WheelItem } from "../../../../types";

const R = 180;
const CX = 200;
const CY = 200;

function polarToCartesian(angleDeg: number, r: number) {
	const rad = ((angleDeg - 90) * Math.PI) / 180;
	return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

type Props = { readonly item: WheelItem };

export function WheelSlice({ item }: Props) {
	const { startAngle, endAngle, color, label } = item;

	const s = polarToCartesian(startAngle, R);
	const e = polarToCartesian(endAngle, R);
	const largeArc = endAngle - startAngle > 180 ? 1 : 0;
	const d = `M ${CX} ${CY} L ${s.x} ${s.y} A ${R} ${R} 0 ${largeArc} 1 ${e.x} ${e.y} Z`;

	const mid = (startAngle + endAngle) / 2;
	const { x: lx, y: ly } = polarToCartesian(mid, R * 0.62);

	// el texto se orienta radialmente: cuando el segmento llega al puntero (90°)
	// el motion.g compensa la rotación y el label queda siempre horizontal y legible
	const textRotation = mid - 90;

	return (
		<g>
			<path d={d} fill={color} stroke="#111827" strokeWidth="1.5">
				<title>{label}</title>
			</path>
			<text
				x={lx}
				y={ly}
				textAnchor="middle"
				dominantBaseline="middle"
				fill="white"
				fontSize="12"
				fontWeight="600"
				transform={`rotate(${textRotation}, ${lx}, ${ly})`}
				style="pointer-events:none;user-select:none"
			>
				{label}
			</text>
		</g>
	);
}
