import { PlayerContext } from "@/contexts/PlayerContext";
import { useContext } from "react";
import Image from "next/image";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "./styles.module.scss";

export function Player() {
  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={292}
            height={292}
            src={episode.thumbnail}
            style={{ objectFit: "cover" }}
            alt="Thumbnail do podcast"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          {episode ? (
            <Slider
              trackStyle={{ backgroundColor: "#04D361" }}
              railStyle={{ backgroundColor: "#9F75FF" }}
              handleStyle={{ borderColor: "#04D361", borderWidth: 4 }}
            />
          ) : (
            <div className={styles.slider}>
              <div className={styles.emptySlider} />
            </div>
          )}
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
          >
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar próximo" disabled={!episode} />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir" disabled={!episode} />
          </button>
        </div>
      </footer>
    </div>
  );
}
