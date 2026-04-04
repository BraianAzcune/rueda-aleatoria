import { useRef, useState } from "preact/hooks";
import { useWheelStore } from "../../store/wheelStore";
import type { WheelItem } from "../../types";
import type { SpinStatus } from "./status/StatusBar/StatusBar";
import { useStopSound } from "./useStopSound";

const FULL_TURNS = 5;
// El puntero está a las 3 en punto → 90° en coordenadas SVG (0° = arriba)
const POINTER_ANGLE = 90;

function pickWinner(items: WheelItem[]): WheelItem {
	const total = items.reduce((s, i) => s + i.percentage, 0);
	let rand = Math.random() * total;
	for (const item of items) {
		rand -= item.percentage;
		if (rand <= 0) return item;
	}
	const fallback = items.at(-1);
	if (!fallback) {
		throw new Error("Cannot pick winner from empty items");
	}
	return fallback;
}

function targetRotation(winner: WheelItem, currentRotation: number): number {
	const midAngle = (winner.startAngle + winner.endAngle) / 2;
	// cuánto hay que girar para que midAngle quede en POINTER_ANGLE
	const needed = (POINTER_ANGLE - midAngle + 360) % 360;
	// normalizar rotación actual al rango [0, 360)
	const currentNorm = ((currentRotation % 360) + 360) % 360;
	// diferencia adicional para llegar desde la posición normalizada actual
	const extra = (needed - currentNorm + 360) % 360;
	return currentRotation + FULL_TURNS * 360 + extra;
}

type UseWheelSpin = {
	spinStatus: SpinStatus;
	winner: WheelItem | null;
	rotation: number;
	pulseCount: number;
	handleSpin: (items: WheelItem[]) => void;
	handleRotationUpdate: (rotation: number) => void;
	handleAnimationComplete: () => void;
};

export function useWheelSpin(): UseWheelSpin {
	const [spinStatus, setSpinStatus] = useState<SpinStatus>("idle");
	const [winner, setWinner] = useState<WheelItem | null>(null);
	const [rotation, setRotation] = useState(0);
	const [pendingWinner, setPendingWinner] = useState<WheelItem | null>(null);
	const [pulseCount, setPulseCount] = useState(0);
	const liveRotation = useRef(0);
	const pendingItems = useRef<WheelItem[]>([]);
	const setIsSpinning = useWheelStore((s) => s.setIsSpinning);
	const { play: playStopSound } = useStopSound();

	function handleSpin(items: WheelItem[]) {
		const picked = pickWinner(items);
		const nextRotation = targetRotation(picked, liveRotation.current);

		pendingItems.current = items;
		setPendingWinner(picked);
		setWinner(null);
		setRotation(nextRotation);
		setPulseCount((n) => n + 1);
		setSpinStatus("spinning");
		setIsSpinning(true);
	}

	function handleRotationUpdate(nextRotation: number) {
		liveRotation.current = nextRotation;
	}

	function handleAnimationComplete() {
		if (spinStatus !== "spinning") return;
		setWinner(pendingWinner);
		setSpinStatus("done");
		setIsSpinning(false);
		playStopSound(pendingItems.current);
	}

	return {
		spinStatus,
		winner,
		rotation,
		pulseCount,
		handleSpin,
		handleRotationUpdate,
		handleAnimationComplete,
	};
}
