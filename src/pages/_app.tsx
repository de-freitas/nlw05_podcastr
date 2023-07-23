import "../styles/global.scss";

import type { AppProps } from "next/app";

import { Header } from "../components/Header/Header";
import { Player } from "../components/Player/Player";
import styles from "../styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

// export default function App() {
//   return (
//     <>
//       <Header />
//     </>
//   );
// }
