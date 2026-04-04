import { useEffect, useRef } from "preact/hooks";
import type { WheelItem } from "../../types";
import { getEffectForLabel } from "./wheel/WheelSlice/SliceLabel/effectRegistry";

export function useStopSound() {
	const defaultAudio = useRef<HTMLAudioElement | null>(null);
	const minecraftAudio = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const base = import.meta.env.BASE_URL;
		defaultAudio.current = new Audio(`${base}wheel_fin_200msec.wav`);
		minecraftAudio.current = new Audio(`${base}wheel_fin_minecraft.mp3`);
	}, []);

	function play(items: WheelItem[]) {
		const hasMinecraft = items.some(
			(item) => getEffectForLabel(item.label) === "minecraft",
		);
		const audio = hasMinecraft ? minecraftAudio.current : defaultAudio.current;
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch(() => {});
		}
	}

	return { play };
}
