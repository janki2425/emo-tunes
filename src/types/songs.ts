export type Song = {
    name: string;
    artist: string | 'unknown artist';
    albumArt: string | null;
    spotifyUrl: string;
  };
  
  export interface SongListProps {
    songs: Song[];
  }

  export type MoodRecommenderProps = {
    isResultShown: boolean;
    setIsResultShown: React.Dispatch<React.SetStateAction<boolean>>;
    searchMode: 'card' | 'text' | null;
    setSearchMode: React.Dispatch<React.SetStateAction<'card' | 'text' | null>>;
    noResults: boolean;
    setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
 