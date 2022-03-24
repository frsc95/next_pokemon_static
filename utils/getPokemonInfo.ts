import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const getPokemonInfo = async (nameOrId: string) => {

    // const { name } = params as { name: string };
    // const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
}