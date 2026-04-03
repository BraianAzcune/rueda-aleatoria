import { useWheelStore } from "../../store/wheelStore";
import { StatusBar } from "./status/StatusBar/StatusBar";
import { WinnerDisplay } from "./status/WinnerDisplay/WinnerDisplay";
import { useWheelSpin } from "./useWheelSpin";
import { WheelEmpty } from "./WheelEmpty/WheelEmpty";
import { Wheel } from "./wheel/Wheel/Wheel";

export function WheelPanel() {
	const items = useWheelStore((s) => s.items);
	const {
		spinStatus,
		winner,
		rotation,
		pulseCount,
		handleSpin,
		handleRotationUpdate,
		handleAnimationComplete,
	} = useWheelSpin();

	if (items.length === 0) {
		return <WheelEmpty />;
	}

	return (
		<div class="flex flex-col items-center gap-4">
			<StatusBar status={spinStatus} />
			<Wheel
				items={items}
				rotation={rotation}
				pulseCount={pulseCount}
				onClick={() => handleSpin(items)}
				onRotationUpdate={handleRotationUpdate}
				onAnimationComplete={handleAnimationComplete}
			/>
			<WinnerDisplay winner={winner} />
		</div>
	);
}
