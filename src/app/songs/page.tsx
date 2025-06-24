"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";
import SongList from "@/components/SongList";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function SongsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const mood = searchParams.get("mood");
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        let res;
        if (mood) {
          res = await axiosInstance.get(`/api/suggest-songs/${mood}`);
        } else if (query) {
          res = await axiosInstance.post(`/api/suggest-songs-by-text`, { text: query });
        }
        setSongs(res?.data?.tracks || []);
      } catch {
        setSongs([]);
      }
      setLoading(false);
    };

    if (mood || query) fetchSongs();
  }, [mood, query]);

  return (
    <div className="mt-[60px] p-2">
      {loading ? (
            <SkeletonLoader count={10} />
        ) : (
            <SongList songs={songs} />
      )}
    </div>
  );
} 