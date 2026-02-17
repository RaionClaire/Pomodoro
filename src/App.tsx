import "./App.css";
import FloatingButton from "./components/floating-button";
import Timer from "./components/timer-card";
import { useState } from "react";

function App() {
  const [wallpaper, setWallpaper] = useState<string>("none");
  const [soundNotif, setSoundNotif] = useState<string>("notification_1.m4a");

  return (
    <div
      className="app-container"
      style={{
        backgroundImage:
          wallpaper !== "none" ? `url('/wallpapers/${wallpaper}')` : "none",
        backgroundColor: wallpaper === "none" ? "#1a3a1a" : "transparent",
      }}
    >
      <Timer soundNotif={soundNotif} />
      <FloatingButton
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
        soundNotif={soundNotif}
        setSoundNotif={setSoundNotif}
      />
    </div>
  );
}

export default App;
