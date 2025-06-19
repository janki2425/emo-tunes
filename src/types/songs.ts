export type Song = {
    name: string;
    artist: string;
    albumArt: string | null;
    previewUrl: string;
  };
  
  export interface SongListProps {
    songs: Song[];
  }