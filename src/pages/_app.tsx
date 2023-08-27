import "../styles/global.scss";

import type { AppProps } from "next/app";
import { useState } from "react";

import { PlayerContext } from "@/contexts/PlayerContext";
import { Header } from "../components/Header/Header";
import { Player } from "../components/Player/Player";

import styles from "../styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode: any) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }
  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

// export default function App() {
//   return (
//     <>
//       <Header />
//     </>
//   );
// }
