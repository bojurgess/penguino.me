import type { ProgressInfo } from '../../types/ProgressInfo';
import type { Spotify } from '../../types/Spotify';

export function getProgressInfo(data: Spotify.CurrentlyPlaying): ProgressInfo {
	return {
		progress_ms: data.progress_ms,
		duration_ms: data.item.duration_ms,
		progress_percent: getProgressPercentage(data.progress_ms, data.item.duration_ms),
		is_playing: data.is_playing,
		currently_playing_type: data.currently_playing_type
	};
}

export function getProgressPercentage(pms: number, dms: number): number {
	return (pms / dms) * 100;
}

export function getTime(x: number) {
	const minutes = Math.floor(x / 60000);
	const seconds = ((x % 60000) / 1000).toFixed(0);
	return `${minutes}:${seconds.padStart(2, '0')}`;
}

export function getRemainingTime([x, y]: number[]) {
	const minutes = Math.floor((y - x) / 60000);
	const seconds = (((y - x) % 60000) / 1000).toFixed(0);
	return `${minutes}:${seconds.padStart(2, '0')}`;
}
