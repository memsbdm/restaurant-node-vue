<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { PlaceAutocompleteDto } from '#dtos/place_autocomplete'
import { tuyau } from '~/core/providers/tuyau'
import { useDebounceFn } from '@vueuse/core'

let input = ref('')
const places = ref<PlaceAutocompleteDto[]>([])

const props = defineProps<{
  modelValue: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const value = target.value
  input.value = value
  debouncedFetchPlaces(value)
}

const debouncedFetchPlaces = useDebounceFn(async (value: string) => {
  internalValue.value = ''

  if (!value) {
    places.value = []
    return
  }

  const res = await fetch(tuyau.$url('api.google.autocomplete'), {
    method: 'POST',
    body: JSON.stringify({ input: value }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  places.value = await res.json()
}, 300)

const value = ref<(typeof places.value)[0]>()
function selectPlace(place: PlaceAutocompleteDto) {
  internalValue.value = place.id
  input.value = place.text
  places.value = []
}
</script>

<template>
  <Combobox v-model="value">
    <ComboboxAnchor class="w-full">
      <div class="relative w-full items-center">
        <ComboboxInput
          class="pl-9"
          :value="input"
          @input="handleInput"
          placeholder="Enter a restaurant name"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>
    <ComboboxList class="w-80" v-if="!internalValue && input.length > 3 && places.length === 0">
      <ComboboxEmpty> No place found. </ComboboxEmpty>
    </ComboboxList>
    <ComboboxGroup v-if="places.length > 0">
      <ComboboxList class="w-80">
        <p
          v-for="place in places"
          :key="place.id"
          @click="() => selectPlace(place)"
          class="cursor-pointer gap-2 select-none justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
        >
          {{ place.text }}
        </p>
      </ComboboxList>
    </ComboboxGroup>
  </Combobox>
  <div v-if="error" class="text-red-500 text-sm">
    {{ error }}
  </div>
</template>
