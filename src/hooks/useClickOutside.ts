import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

/**
 * Configuracion del hook `useClickOutside`.
 *
 * - `enabled`: activa o desactiva el listener global.
 * - `ref`: referencia al contenedor considerado "inside".
 * - `onOutsideClick`: callback que se ejecuta al hacer click fuera.
 */
type UseClickOutsideOptions = Readonly<{
	enabled: boolean;
	ref: RefObject<HTMLElement | null>;
	onOutsideClick: () => void;
}>;

/**
 * Ejecuta un callback cuando el usuario hace click fuera del elemento referenciado.
 *
 * Pensado para casos simples como cerrar modo edicion, dropdowns o popovers.
 * Usa `pointerdown` en captura para detectar la interaccion lo antes posible.
 *
 * Ejemplo:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useClickOutside({
 *   enabled: isOpen,
 *   ref: containerRef,
 *   onOutsideClick: () => setIsOpen(false),
 * });
 * ```
 */
export function useClickOutside({
	enabled,
	ref,
	onOutsideClick,
}: UseClickOutsideOptions) {
	useEffect(() => {
		if (!enabled) return;

		function handlePointerDown(event: PointerEvent) {
			const target = event.target as Node | null;
			if (target && ref.current?.contains(target)) return;
			onOutsideClick();
		}

		document.addEventListener("pointerdown", handlePointerDown, true);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
		};
	}, [enabled, ref, onOutsideClick]);
}
