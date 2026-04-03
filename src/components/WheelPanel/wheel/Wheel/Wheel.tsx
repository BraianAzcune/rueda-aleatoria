import { motion, useAnimationControls } from "motion/react";
import type { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { WheelItem } from "../../../../types";
import type { SpinStatus } from "../../status/StatusBar/StatusBar";
import { WheelPointer } from "../WheelPointer/WheelPointer";
import { WheelSlice } from "../WheelSlice/WheelSlice";
import "./Wheel.css";

const SIZE = 400;
const CX = 200;
const CY = 200;
const R = 180;
const AURA_GLOW_RADIUS = R;
const SPIN_DURATION_SECONDS = 3;
const SCALE_DURATION_SECONDS = 1.15;
const SCALE_KEYFRAMES = [1, 1.18, 1];
const SCALE_TIMES = [0, 0.18, 1];
const SCALE_EASE: [number, number, number, number] = [0.22, 0.9, 0.3, 1];
const ROTATION_EASE: [number, number, number, number] = [0.12, 0.82, 0.22, 1];

const AURA_PULSE_DURATION_MS = 200;
const WINNER_IMPACT_DURATION_MS = 900;
const WINNER_SCALE_KEYFRAMES = [1, 1.1, 1];
const WINNER_SCALE_TIMES = [0, 0.25, 1];
const WINNER_SCALE_DURATION_SECONDS = 0.4;

type AuraVars = { scale: number; duration: string };
const AURA_IDLE: AuraVars = { scale: 1, duration: "4s" };
const AURA_PULSE: AuraVars = { scale: 5, duration: "20s" };
const AURA_SPINNING: AuraVars = { scale: 2, duration: "1.5s" };
const AURA_DONE: AuraVars = { scale: 4, duration: "10s" };

type Props = {
	readonly items: WheelItem[];
	readonly spinStatus: SpinStatus;
	readonly rotation: number;
	readonly pulseCount: number;
	readonly onClick: () => void;
	readonly onRotationUpdate: (rotation: number) => void;
	readonly onAnimationComplete: () => void;
};

export function Wheel({
	items,
	spinStatus,
	rotation,
	pulseCount,
	onClick,
	onRotationUpdate,
	onAnimationComplete,
}: Props) {
	const scaleControls = useAnimationControls();
	const [isPulsing, setIsPulsing] = useState(false);
	const [isWinnerImpact, setIsWinnerImpact] = useState(false);
	const [auraKey, setAuraKey] = useState(0);
	const prevSpinStatus = useRef<SpinStatus>(spinStatus);

	useEffect(() => {
		if (prevSpinStatus.current !== "done" && spinStatus === "done") {
			prevSpinStatus.current = spinStatus;
			setAuraKey((k) => k + 1);
			setIsWinnerImpact(true);
			scaleControls.start({
				scale: WINNER_SCALE_KEYFRAMES,
				transition: {
					duration: WINNER_SCALE_DURATION_SECONDS,
					ease: SCALE_EASE,
					times: WINNER_SCALE_TIMES,
				},
			});
			const timer = setTimeout(
				() => setIsWinnerImpact(false),
				WINNER_IMPACT_DURATION_MS,
			);
			return () => clearTimeout(timer);
		}
		prevSpinStatus.current = spinStatus;
	}, [spinStatus, scaleControls]);

	useEffect(() => {
		if (pulseCount === 0) return;
		setIsPulsing(true);
		const timer = setTimeout(() => setIsPulsing(false), AURA_PULSE_DURATION_MS);
		return () => clearTimeout(timer);
	}, [pulseCount]);

	function getAuraVars(): AuraVars {
		if (isPulsing) return AURA_PULSE;
		if (spinStatus === "spinning") return AURA_SPINNING;
		if (spinStatus === "done") return AURA_DONE;
		return AURA_IDLE;
	}

	const aura = getAuraVars();

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
						<circle
							key={auraKey}
							cx={CX}
							cy={CY}
							r={AURA_GLOW_RADIUS}
							class="AuraGlowFill"
							style={
								{
									"--aura-glow-scale": aura.scale,
									"--aura-glow-pulse-duration": aura.duration,
								} as JSX.CSSProperties
							}
						/>

						{items.map((item) => (
							<WheelSlice key={item.id} item={item} />
						))}
					</motion.g>

					{isWinnerImpact && (
						<circle
							cx={CX}
							cy={CY}
							r={AURA_GLOW_RADIUS}
							class="AuraWinnerBurst"
						/>
					)}

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
