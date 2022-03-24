import type { NextPage, GetStaticProps } from 'next'
import { Button, Card, Grid, Image, Row, Text } from '@nextui-org/react';


import { pokeApi } from '../api'
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';
// import styles from '../styles/Home.module.css'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  // console.log(props);
  // console.log({props});
  // console.log({pokemons}); // log en cliente


  return (
    <Layout title='Listado de Pokemons'>
      {/* <h1>Hola món</h1> */}
      {/* <Button color="gradient"> hola món </Button> */}

      {/* <ul> */}
      <Image
        src='/img/banner.jpg'
        width={500}
        height={250}
       />

      <Grid.Container gap={1.21} justify='flex-start'>
        {
          // pokemons.map( ({ id, name, img }) => (
          pokemons.map((pokemon) => (
            // { pokemon }
            // <li key={id}> #{id} - {name} </li> 
            // {/* padding de 1 p:1 */}
            <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
              {/* <Card hoverable clickable>
               
                <Card.Body css={{ p: 1 }}>
                  <Card.Image
                    src={img}
                    width="100%"
                    height={140}
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify="space-between">
                    <Text transform='capitalize'>{name}</Text>
                    <Text>#{id}</Text>
                  </Row>
                </Card.Footer>
              </Card> */}
            </Grid>
          ))
        }
      </Grid.Container>

      {/* <ul>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
      </ul> */}
    </Layout>

  )
}

// // para poder usar la funcion en tiempo de compilacion
// export async function getStaticProps(ctx){
//   return { props: {} } // will be passed to the page component as props
// }

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// import { GetStaticProps } from 'next'

// nextgetStaticProps + tab

//solo se puede usar en las paginas , no en los components
//  esto se ejecuta en la parte del servidor
export const getStaticProps: GetStaticProps = async (ctx) => {

  // console.log('hola mundito');
  // const resp = await pokeApi.get('https://pokeapi.co/api/v2/pokemon?limit=151')
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  // console.log(data); // log en el servidor
  console.log('-.-.-.'); // log en el servidor


  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));
  //  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg
  //  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'IDPOKEMON'.svg


  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage;
