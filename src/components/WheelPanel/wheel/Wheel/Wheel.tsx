import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "preact/hooks";
import type { WheelItem } from "../../../../types";
import { WheelPointer } from "../WheelPointer/WheelPointer";
import { WheelSlice } from "../WheelSlice/WheelSlice";

const SIZE = 400;
const CX = 200;
const CY = 200;
const R = 180;
const SPIN_DURATION_SECONDS = 3;
const SCALE_DURATION_SECONDS = 1.15;
const SCALE_KEYFRAMES = [1, 1.18, 1];
const SCALE_TIMES = [0, 0.18, 1];
const SCALE_EASE: [number, number, number, number] = [0.22, 0.9, 0.3, 1];
const ROTATION_EASE: [number, number, number, number] = [0.12, 0.82, 0.22, 1];

type Props = {
	readonly items: WheelItem[];
	readonly rotation: number;
	readonly pulseCount: number;
	readonly onClick: () => void;
	readonly onRotationUpdate: (rotation: number) => void;
	readonly onAnimationComplete: () => void;
};

export function Wheel({
	items,
	rotation,
	pulseCount,
	onClick,
	onRotationUpdate,
	onAnimationComplete,
}: Props) {
	const scaleControls = useAnimationControls();

	useEffect(() => {
		if (pulseCount === 0) return;

		scaleControls.start({
			scale: SCALE_KEYFRAMES,
			transition: {
				duration: SCALE_DURATION_SECONDS,
				ease: SCALE_EASE,
				times: SCALE_TIMES,
			},
		});
	}, [pulseCount, scaleControls]);

	return (
		<button
			type="button"
			onClick={onClick}
			aria-label="Girar rueda"
			class="inline-flex overflow-visible p-0 bg-transparent border-0 cursor-pointer"
		>
			<svg
				width={SIZE}
				height={SIZE}
				viewBox={`0 0 ${SIZE} ${SIZE}`}
				class="select-none overflow-visible"
			>
				<title>Rueda</title>
				<motion.g
					initial={{ scale: 1 }}
					animate={scaleControls}
					style={{ transformOrigin: `${CX}px ${CY}px` }}
				>
					{/* fondo del círculo */}
					<circle cx={CX} cy={CY} r={R} fill="#111827" />

					<motion.g
						style={{ transformOrigin: `${CX}px ${CY}px` }}
						animate={{ rotate: rotation }}
						onUpdate={(latest) => {
							const current = latest.rotate;
							if (typeof current === "number") {
								onRotationUpdate(current);
							}
						}}
						transition={{
							duration: SPIN_DURATION_SECONDS,
							ease: ROTATION_EASE,
						}}
						onAnimationComplete={onAnimationComplete}
					>
						{items.map((item) => (
							<WheelSlice key={item.id} item={item} />
						))}
					</motion.g>

					{/* aro exterior */}
					<circle
						cx={CX}
						cy={CY}
						r={R}
						fill="none"
						stroke="#374151"
						strokeWidth="2"
					/>

					{/* centro */}
					<circle
						cx={CX}
						cy={CY}
						r={10}
						fill="#1f2937"
						stroke="#374151"
						strokeWidth="2"
					/>
				</motion.g>

				<WheelPointer />
			</svg>
		</button>
	);
}
