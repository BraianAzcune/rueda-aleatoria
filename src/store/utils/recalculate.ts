import type { WheelItem } from "../../types";

const DEFAULT_COLORS = [
	"#ef4444",
	"#3b82f6",
	"#22c55e",
	"#eab308",
	"#a855f7",
	"#f97316",
	"#ec4899",
	"#06b6d4",
	"#84cc16",
	"#f43f5e",
];

export function defaultColor(index: number): string {
	return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

export function recalculate(items: WheelItem[]): WheelItem[] {
	if (items.length === 0) return [];

	const total = items.reduce((s, i) => s + i.percentage, 0);
	let cursor = 0;

	return items.map((item, idx) => {
		const pct =
			total === 0 ? 100 / items.length : (item.percentage / total) * 100;
		const startAngle = cursor;
		const endAngle =
			idx === items.length - 1 ? 360 : cursor + (pct / 100) * 360;
		cursor = endAngle;
		return {
			...item,
			percentage: Math.round(pct * 100) / 100,
			startAngle,
			endAngle,
		};
	});
}
