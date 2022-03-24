// import React from 'react'
// rafce exporta por defecto

import { useEffect, useState } from "react";
import { Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";

const FavoritesPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    //solo se ejecutara la primera vez
    useEffect(() => {
        console.log('jaja')
        setFavoritePokemons(localFavorites.pokemons())
    }, []);

    return (
        <Layout title="Pokemons Favoritos">
            {
                favoritePokemons.length === 0 ?
                    <NoFavorites /> :
                    <FavoritePokemons pokemons={favoritePokemons}/>
            }
            {/* <NoFavorites /> */}
        </Layout>
    )
}

export default FavoritesPage;