import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WheelItem } from "../types";
import { DUMMY_ITEMS } from "./dummy-options";
import { defaultColor, recalculate } from "./utils/recalculate";

type WheelStore = {
	items: WheelItem[];
	isSpinning: boolean;
	setIsSpinning: (isSpinning: boolean) => void;
	addItem: (label: string) => void;
	removeItem: (id: string) => void;
	updateLabel: (id: string, label: string) => void;
	updateColor: (id: string, color: string) => void;
	updatePercentage: (id: string, percentage: number) => void;
	resetProbabilities: () => void;
};

export const useWheelStore = create<WheelStore>()(
	persist(
		(set) => ({
			items: recalculate(DUMMY_ITEMS),
			isSpinning: false,

			setIsSpinning: (isSpinning) => set(() => ({ isSpinning })),

			addItem: (label) =>
				set((state) => {
					if (state.isSpinning) return state;
					const n = state.items.length + 1;
					const equalPct = 100 / n;
					const base = state.items.map((item) => ({
						...item,
						percentage: equalPct,
					}));
					const newItem: WheelItem = {
						id: crypto.randomUUID(),
						label,
						color: defaultColor(state.items.length),
						percentage: equalPct,
						startAngle: 0,
						endAngle: 0,
					};
					return { items: recalculate([...base, newItem]) };
				}),

			removeItem: (id) =>
				set((state) => {
					if (state.isSpinning) return state;
					return {
						items: recalculate(state.items.filter((i) => i.id !== id)),
					};
				}),

			updateLabel: (id, label) =>
				set((state) => {
					if (state.isSpinning) return state;
					return {
						items: state.items.map((i) => (i.id === id ? { ...i, label } : i)),
					};
				}),

			updateColor: (id, color) =>
				set((state) => {
					if (state.isSpinning) return state;
					return {
						items: state.items.map((i) => (i.id === id ? { ...i, color } : i)),
					};
				}),

			resetProbabilities: () =>
				set((state) => {
					if (state.isSpinning) return state;
					const n = state.items.length;
					if (n === 0) return state;
					const equalPct = 100 / n;
					return {
						items: recalculate(
							state.items.map((item) => ({ ...item, percentage: equalPct })),
						),
					};
				}),

			updatePercentage: (id, percentage) =>
				set((state) => {
					if (state.isSpinning) return state;
					const others = state.items.filter((i) => i.id !== id);
					if (others.length === 0) return state;

					const clamped = Math.min(
						Math.max(percentage, 1),
						100 - others.length,
					);
					const remaining = 100 - clamped;
					const othersTotal = others.reduce((s, i) => s + i.percentage, 0);

					const updated = state.items.map((item) => {
						if (item.id === id) return { ...item, percentage: clamped };
						const share =
							othersTotal === 0
								? remaining / others.length
								: (item.percentage / othersTotal) * remaining;
						return { ...item, percentage: share };
					});

					return { items: recalculate(updated) };
				}),
		}),
		{
			name: "wheel-store",
			partialize: (state) => ({ items: state.items }),
		},
	),
);
