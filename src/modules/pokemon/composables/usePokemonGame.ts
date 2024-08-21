import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from "../api/pokemonApi"
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>( GameStatus.Playing )
    const pokemons = ref<Pokemon[]>( [] )
    const pokemonOptions = ref<Pokemon[]>( [] )
    const isLoading = computed(() => pokemons.value.length === 0)
    const randomPokemon = computed<Pokemon>(() => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)])

    const getPokemons = async (): Promise<Pokemon[]> => {
        const res = await pokemonApi.get<PokemonListResponse>("/?limit=151")

        const pokemonsArray = res.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/')
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id
            }
        })  
 
        return pokemonsArray.sort(() => Math.random() - 0.5)

    }


    const getNextOptions = (howMany: number = 4) => {
        gameStatus.value = GameStatus.Playing
        pokemonOptions.value = pokemons.value.slice(0, howMany)
        pokemons.value = pokemons.value.slice(howMany)

    }

    const check = (id:number) => {
        const hasWon = randomPokemon.value.id === id
        if(hasWon) {
            gameStatus.value = GameStatus.Won
            confetti({
                particleCount: 300,
                spread: 150,
                origin: {y: 0.6}
            })

            return
        }

        gameStatus.value = GameStatus.Lost
    }

    onMounted( async () => {
        pokemons.value = await getPokemons()
        getNextOptions()
    })

    return {
        gameStatus,
        isLoading,
        getNextOptions,
        randomPokemon,
        pokemonOptions,
        check
    }
}