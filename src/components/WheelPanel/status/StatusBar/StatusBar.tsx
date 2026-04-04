export type SpinStatus = "idle" | "spinning" | "done";

const MESSAGES: Record<SpinStatus, string> = {
	idle: "Hacé click para girar",
	spinning: "Girando...",
	done: "¡Listo!",
};

type Props = { readonly status: SpinStatus };

export function StatusBar({ status }: Props) {
	return (
		<p class="text-sm font-medium tracking-wide text-white">
			{MESSAGES[status]}
		</p>
	);
}
