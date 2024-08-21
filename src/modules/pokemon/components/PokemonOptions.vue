<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="option in options"
      v-bind:key="option.id"
      :class="['capitalize disable:shadow-none disabled:bg-gray-100', {
        correct: option.id === answer && finish,
        incorrect: option.id !== answer && finish
      }]"
      @click="$emit('selectedOption', option.id)"
      :disabled="finish"
    >
      {{ option.name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  finish: boolean;
  answer: number
}

const { options, finish, answer } = defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>
