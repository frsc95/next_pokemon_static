// import React, { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts'
import { pokeApi } from '../../api';
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
// import { useEffect } from 'react';
// rafce

interface Props {
  pokemon: Pokemon;
  // id: string;
  // name: string
}

// desestructurar pokemon
const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] =
   useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    // console.log('ID:', pokemon.id)
    // localStorage.setItem('favorites', `${pokemon.id}`)
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if(isInFavorites) return;

    confetti({
      zIndex: 0,
      particleCount: 100,
      spread: 160, //20,// 160,
      angle: -100, //180,//-100,
      origin: {x:1, y:0},  //startVelocity:65

    })
  }

  // este log se ejecuta en servidor y da error pk el servidor no gestiona localstorage
  // no tenemos info sobre la clase windows pk estamos en node
  // console.log(localStorage.getItem('favorites'));
  console.log({existeWindow: typeof window}); // este log le sale al cliente y al servidor 
  // el useeffect se ejecuta solo en el lado del cliente
  

  // useEffect(() => console.log('useEffect', localStorage.getItem('favorites')), []);

  // const router = useRouter(); // cogera el parametro de la url
  // console.log(router.query);

  // useEffect( () => {
  //   console.log('http://')
  // //   return () => { }
  // }, [])
  // console.log(pokemon);


  return (
    <Layout title={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}>
      {/* <h1>{id} - {name}</h1> */}
      {/* <h1>temporal {pokemon.name}</h1> */}
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4} >
          <Card hoverable css={{ padding: '38px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* importantisimo el h1 para los bots del SEO */}
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite}>
                { isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0} >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>

          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


// nextstaticpaths + tab
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// pk tenemos dyanmic routes [id].ts
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here 
  // tienen que ser string pk van por url

  //generar un array [0,1,2 ... 150] -> ['1','1','2' ... '151']
  const pokemons151: string[] = [...Array(151)].map((value, index) =>
    `${index + 1}`
  )

  return {
    // paths: [
    //   // paths permitidos por url
    //   { params: { id: '1' } },
    //   { params: { id: '2' } },
    //   { params: { id: '3' } }
    // ]
    paths: pokemons151.map(id => ({
      params: { id } // {id: id}
    }))
    ,
    fallback: false // asi si no está la pagina devuelve 404 //"blocking"
  }
}

//ctx es contexto, se ha desestructurado a params
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };
  // const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  return {
    props: {
      // id: 1,
      // name: 'Bulbasaur'
      pokemon: await getPokemonInfo(id) // params.id || '' // data
    }
  }
}

export default PokemonPage;