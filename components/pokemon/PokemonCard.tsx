// import React from 'react'
// rafc

import { FC } from "react"
import { Card, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { SmallPokemon } from "../../interfaces"

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    // se podia haber desestructurado : {{ pokemon: { id,img, name }}}
    // {img, id , name } = pokemon;

    const router = useRouter();

    const onClick =  () => {
        // router.push(`/pokemon/${pokemon.id}`)
        router.push(`/name/${pokemon.name}`) // la url será por nombre, ya no por Id
    }

    return (
        <Card hoverable clickable onClick={onClick}>
            {/* padding de 1 p:1 */}
            <Card.Body css={{ p: 1 }}>
                <Card.Image
                    src={pokemon.img}
                    width="100%"
                    height={140}
                />
            </Card.Body>
            <Card.Footer>
                <Row justify="space-between">
                    <Text transform='capitalize'>{pokemon.name}</Text>
                    <Text>#{pokemon.id}</Text>
                </Row>
            </Card.Footer>
        </Card>
    )
}
