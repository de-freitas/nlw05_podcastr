import { useEffect } from "react";

type homeParams = any;

// aqui os parâmetros 'props' estão sendo retornados pela função getServerSideProps
export default function Home(props: homeParams) {
  // Modelo padrão de SPA. Usa-se 'useEffect()' com o segundo parâmetro nulo "[]", assim ele carrega o conteúdo
  // da página uma única vez quando ela é chamada.
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data)),
  //     [];
  // });
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

// para usar SSR, é necessário exportar a função getServerSideProps() dentro de qualquer
// arquivo na pasta 'pages'. O next irá executar primeiro essa função antes de exibir o conteúdo da página
// export async function getServerSideProps() {
//   const response = await fetch("http://localhost:3333/episodes");
//   const data = await response.json();

//   return {
//     props: {
//       //Este retorno 'props' precisa ser sempre props. Esses parÂmetros podem ser utilizados na função Home()
//       episodes: data,
//     },
//   };
// }

// Agora usando a estratégia de SSG - static site generation
// Usa-se a função getStaticProps(), assim os dados serão 'renovados' a cada certo tempo determinado, assim economizando recursos
//obs.: Só funciona em produção, necessário buildar antes de rodar
export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      //Este retorno 'props' precisa ser sempre props. Esses parÂmetros podem ser utilizados na função Home()
      episodes: data,
    },
    // a diferença do SSR é o uso do 'revalidate'
    revalidate: 60 * 60 * 8, // 8hrs
  };
}
