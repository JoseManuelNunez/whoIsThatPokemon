<template>
<section>
    <img v-if="!props.show" :src="pokemonImage" class="brightness-0">
    <img v-else :src="pokemonImage" class="fade-in">
</section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    id: number
    show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    show: false
})
const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`)


</script>

<style scoped>
img {
    height: 200px;
    user-select: none;
    --moz-user-select: none;
    --ms-user-select: none;
    --webkit-user-select: none;
    --webkit-user-drag: none;
}
</style>