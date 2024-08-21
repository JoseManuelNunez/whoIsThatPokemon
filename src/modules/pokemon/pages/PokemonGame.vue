<template>
  <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>
  
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">Quien es este Pokémon</h1>
    <button v-if="gameStatus !== GameStatus.Playing" @click="getNextOptions(4)">Jugar otra vez</button>

    <PokemonPictures :id="randomPokemon.id" :show="gameStatus !== GameStatus.Playing" />

    <PokemonOptions :options="pokemonOptions" @selected-option="check($event)" :finish="gameStatus !== GameStatus.Playing" :answer="randomPokemon.id" />

  </section>

</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPictures from '../components/PokemonPictures.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions, check, getNextOptions } = usePokemonGame()

</script>

<style scoped></style>
