import { useEffect, useRef, useState } from "react";
import "./App.css";
import spotifyClient from "./lib/spotify";
import { SongList } from "./Components/SongList .JSX";
import { Player } from "./Components/Player";
import { SearchInput } from "./Components/SearchInput";
import { Pagination } from "./Components/Pagenation";

const limit = 20;

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [keyword, setKeyword] = useState("");
  const [serchedSongs, setSearchedSongs] = useState();
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const isSerchedResult = serchedSongs != null;
  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    //非同期処理のためspotify.jsの非同期処理が全て終わらないとエラーに繋がるため、講座とは書き方が異なる
    async function fetchPopularSongs() {
      const spotify = await spotifyClient;
      const result = await spotify.getPopularSongs();
      const popularSongs = result.items.map((item) => {
        return item.track;
      });
      console.log(popularSongs);
      setPopularSongs(popularSongs);
      setIsLoading(false);
    }
    fetchPopularSongs();
  }, []);

  const searchSongs = async (page) => {
    setIsLoading(true);
    const spotify = await spotifyClient;
    const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0;
    const result = await spotify.searchSongs(keyword, limit, offset);
    setHasNext(result.next !== null);
    setHasPrev(result.previous !== null);
    setSearchedSongs(result.items);
    setIsLoading(false);
  };

  const handleSongSelected = async (song) => {
    setSelectedSong(song);
    if (song.preview_url != null) {
      audioRef.current.src = song.preview_url;
      playSong();
    } else {
      pauseSong();
    }
  };

  const playSong = () => {
    audioRef.current.play();
    setIsPlay(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlay(false);
  };

  const toggleSong = () => {
    if (isPlay) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const moveToNext = async () => {
    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);
  };

  const moveToPrev = async () => {
    const prevPage = page - 1;
    await searchSongs(prevPage);
    setPage(prevPage);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            {isSerchedResult ? "Searched Result" : "Popular Songs"}
          </h2>
          <SongList
            isLoading={isLoading}
            songs={isSerchedResult ? serchedSongs : popularSongs}
            onSongSelected={handleSongSelected}
          ></SongList>
          {isSerchedResult && (
            <Pagination
              onPrev={hasPrev ? moveToPrev : null}
              onNext={hasNext ? moveToNext : null}
            />
          )}
        </section>
      </main>
      {selectedSong != null && (
        <Player
          song={selectedSong}
          isPlay={isPlay}
          onButtonClick={toggleSong}
        />
      )}
      <audio ref={audioRef}></audio>
    </div>
  );
}
