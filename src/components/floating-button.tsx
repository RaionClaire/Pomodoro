"use client";
import { useState } from "react";
import { Pen, Music } from "lucide-react";

interface FloatingButtonProps {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  soundNotif: string;
  setSoundNotif: (sound: string) => void;
}

export default function FloatingButton({
  wallpaper,
  setWallpaper,
  soundNotif,
  setSoundNotif,
}: FloatingButtonProps) {
  const [open, setOpen] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [youtubeSearch, setYoutubeSearch] = useState("");
  const [videoId, setVideoId] = useState("jfKfPfyJRdk");
  const [playlistId, setPlaylistId] = useState("");
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const wallpapers = [
    { value: "none", label: "No Wallpaper" },
    { value: "wallpaper1.png", label: "Stardew Valley" },
    { value: "wallpaper2.jpg", label: "Forest" },
    { value: "wallpaper3.png", label: "Red Dead Redemption 2" },
    { value: "dazai.jpg", label: "The Last of Us" },
  ];

  const sounds = [
    { value: "notification_1.m4a", label: "Sound 1" },
    { value: "2.m4a", label: "Sound 2" },
    { value: "3.m4a", label: "Sound 3" },
    { value: "4.m4a", label: "Sound 4" },
  ];

  const extractVideoId = (url: string) => {
    const playlistMatch = url.match(/[?&]list=([\w-]+)/);
    if (playlistMatch) {
      setIsPlaylist(true);
      setPlaylistId(playlistMatch[1]);
      const videoMatch = url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\S*[?&]v=))([\w-]{11})/,
      );
      return videoMatch ? videoMatch[1] : "";
    }
    
    setIsPlaylist(false);
    setPlaylistId("");
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\S*[?&]v=))([\w-]{11})/,
    );
    return match ? match[1] : url;
  };

  const handleYoutubeSearch = () => {
    const id = extractVideoId(youtubeSearch);
    setVideoId(id);
    setIsPlaying(true);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
      >
        <Pen size={20} />
      </button>

      {/* YouTube Music Button */}
      <button
        onClick={() => setShowYoutube(!showYoutube)}
        className={`fixed bottom-6 left-24 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50 ${
          isPlaying ? "bg-green-500 animate-pulse" : "bg-green-600"
        }`}
      >
        <Music size={20} />
      </button>

      {/* YouTube iframe */}
      {isPlaying && (
        <iframe
          src={
            isPlaylist
              ? `https://www.youtube.com/embed/${videoId}?autoplay=1&list=${playlistId}&mute=0&controls=0`
              : `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=0&controls=0`
          }
          width="0"
          height="0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ display: "none" }}
        ></iframe>
      )}

      {/* YouTube Control Panel */}
      {showYoutube && (
        <div className="fixed bottom-24 left-24 bg-white p-4 rounded-xl shadow-2xl z-50 w-80">
          <h3 className="text-sm font-bold text-green-800 mb-3">
            YouTube Music Player
          </h3>
          <div className="mb-3">
            <label className="block text-xs font-medium text-green-800 mb-1">
              Search YouTube (video or playlist URL)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={youtubeSearch}
                onChange={(e) => setYoutubeSearch(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleYoutubeSearch()}
                className="flex-1 px-2 py-1 text-xs border border-green-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="Video/Playlist URL or ID"
              />
              <button
                onClick={handleYoutubeSearch}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
              >
                Play
              </button>
            </div>
            <p className="text-xs text-green-600 mt-1">
              {isPlaying && "🎵 "}
              {isPlaying ? (isPlaylist ? "Playlist playing" : "Video playing") : "Not playing"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition"
            >
              {isPlaying ? "Stop" : "Resume"}
            </button>
            <button
              onClick={() => setShowYoutube(false)}
              className="flex-1 bg-green-700 text-white px-3 py-2 rounded text-sm hover:bg-green-800 transition"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Popup */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-green-100 p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-green-800 font-bold mb-4">
              Customize Timer
            </h2>

            {/* Wallpaper Selection */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Wallpaper
              </label>
              <select
                value={wallpaper}
                onChange={(e) => setWallpaper(e.target.value)}
                className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white text-green-800 font-medium cursor-pointer hover:border-green-400 transition"
              >
                {wallpapers.map((wp) => (
                  <option key={wp.value} value={wp.value}>
                    {wp.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sound Notification Selection */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Notification Sound
              </label>
              <select
                value={soundNotif}
                onChange={(e) => setSoundNotif(e.target.value)}
                className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white text-green-800 font-medium cursor-pointer hover:border-green-400 transition"
              >
                {sounds.map((sound) => (
                  <option key={sound.value} value={sound.value}>
                    {sound.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-green-700 text-white px-4 py-2 rounded font-medium hover:bg-green-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
