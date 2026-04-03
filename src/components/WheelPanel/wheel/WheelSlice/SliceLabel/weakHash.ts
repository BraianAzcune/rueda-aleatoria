export function weakHash(text: string): number {
	let h = 0;
	for (const c of text) {
		h = (h * 31 + c.charCodeAt(0)) % 65536;
	}
	return h;
}
