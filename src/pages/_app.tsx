import "../styles/global.scss";

import type { AppProps } from "next/app";

import { PlayerContextProvider } from "@/contexts/PlayerContext";
import { Header } from "../components/Header/Header";
import { Player } from "../components/Player/Player";

import styles from "../styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

// export default function App() {
//   return (
//     <>
//       <Header />
//     </>
//   );
// }
