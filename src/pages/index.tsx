/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next"; // faz tipagem da função toda, tanto param como retorno
import Image from "next/image";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
  //episodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  style={{ objectFit: "cover" }}
                />

                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8hrs
  };
};

//=============================================================//
// ABAIXO OS 3 CONCEITOS PARA CONSUMO DE API //
// 1 - SPA usando useEffect
// 2 - SSR - server side rendering, entregando a responsabilidade para o server do Next consumir os dados - ideal para otimização de crawlers
// 3 - SSG - static site generation - getStaticProps - gerando páginas estáticas para otimizar a entrega de conteúdo e recursos computacionais
//=============================================================//

// import { useEffect } from "react";

// type homeParams = any;

// // aqui os parâmetros 'props' estão sendo retornados pela função getServerSideProps
// export default function Home(props: homeParams) {
//   // <<< 1 >>>
//   // Modelo padrão de SPA. Usa-se 'useEffect()' com o segundo parâmetro nulo "[]", assim ele carrega o conteúdo
//   // da página uma única vez quando ela é chamada.
//   // useEffect(() => {
//   //   fetch("http://localhost:3333/episodes")
//   //     .then((response) => response.json())
//   //     .then((data) => console.log(data)),
//   //     [];
//   // });
//   return (
//     <>
//       <h1>Index</h1>
//       <p>{JSON.stringify(props.episodes)}</p>
//     </>
//   );
// }

// // <<< 2 >>>
// // para usar SSR, é necessário exportar a função getServerSideProps() dentro de qualquer
// // arquivo na pasta 'pages'. O next irá executar primeiro essa função antes de exibir o conteúdo da página
// // export async function getServerSideProps() {
// //   const response = await fetch("http://localhost:3333/episodes");
// //   const data = await response.json();

// //   return {
// //     props: {
// //       //Este retorno 'props' precisa ser sempre props. Esses parÂmetros podem ser utilizados na função Home()
// //       episodes: data,
// //     },
// //   };
// // }

// // <<< 3 >>>
// // Agora usando a estratégia de SSG - static site generation
// // Usa-se a função getStaticProps(), assim os dados serão 'renovados' a cada certo tempo determinado, assim economizando recursos
// //obs.: Só funciona em produção, necessário buildar antes de rodar
// export async function getStaticProps() {
//   const response = await fetch("http://localhost:3333/episodes");
//   const data = await response.json();

//   return {
//     props: {
//       //Este retorno 'props' precisa ser sempre props. Esses parÂmetros podem ser utilizados na função Home()
//       episodes: data,
//     },
//     // a diferença do SSR é o uso do 'revalidate'
//     revalidate: 60 * 60 * 8, // 8hrs
//   };
// }
