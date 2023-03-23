import Vibrant from 'node-vibrant';

export function getBrightness(hex: string) {
	hex = hex.replace('#', '');

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return (r * 299 + g * 587 + b * 114) / 1000;
}

export async function getColourPalette(imageUrl: string): Promise<any[]> {
	const palette = await Vibrant.from(imageUrl).getPalette();
	const processedPalette = Object.entries(palette).map(([name, swatch]: any[]) => {
		return {
			hex: swatch.hex,
			lightness: getBrightness(swatch.hex)
		};
	});
	return sortPalette(processedPalette);
}

export function sortPalette(palette: any[]) {
	return palette.sort((a, b) => b.lightness - a.lightness);
}
