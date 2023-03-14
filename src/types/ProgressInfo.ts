import type { Spotify } from './Spotify';

export interface ProgressInfo {
	progress_ms: Spotify.CurrentlyPlaying['progress_ms'];
	duration_ms: Spotify.CurrentlyPlaying['item']['duration_ms'];
	progress_percent: number;
	is_playing: Spotify.CurrentlyPlaying['is_playing'];
	currently_playing_type: Spotify.CurrentlyPlaying['currently_playing_type'];
}

export {};
