const FILTER_ID = "slice-glow";

type Props = {
	readonly label: string;
	readonly lx: number;
	readonly ly: number;
	readonly rotation: number;
};

export function GlowLabel({ label, lx, ly, rotation }: Props) {
	return (
		<>
			<defs>
				<filter id={FILTER_ID} x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2.5" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<text
				x={lx}
				y={ly}
				textAnchor="middle"
				dominantBaseline="middle"
				fill="#e0f0ff"
				fontSize="12"
				fontWeight="800"
				stroke="rgba(100,180,255,0.6)"
				strokeWidth="1"
				paintOrder="stroke"
				filter={`url(#${FILTER_ID})`}
				transform={`rotate(${rotation}, ${lx}, ${ly})`}
				style="pointer-events:none;user-select:none"
			>
				{label}
			</text>
		</>
	);
}
