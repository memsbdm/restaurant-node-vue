<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/AuthLayout.vue'
import CurrencyDto from '#dtos/currency'
import { tuyau } from '~/core/providers/tuyau'
import { Loader } from 'lucide-vue-next'
import RestaurantDto from '#dtos/restaurant'
defineOptions({ layout: AuthLayout })

const props = defineProps<{
  restaurant: RestaurantDto
  countryCurrencyId: number
  currencies: CurrencyDto[]
}>()

const form = useForm({
  currencyId: props.countryCurrencyId,
})
</script>

<template>
  <AppHead title="Choose your currency" description="Choose your currency" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Choose your currency</h1>

    <p class="text-sm text-muted-foreground">
      Choose your restaurant currency from the list below.
    </p>
  </div>

  <form
    @submit.prevent="
      form.patch(tuyau.$url('restaurants.currency.handle', { params: { id: restaurant.id } }))
    "
  >
    <div class="grid gap-3">
      <FormInput type="select" v-model="form.currencyId">
        <SelectItem v-for="currency in currencies" :key="currency.id" :value="currency.id">
          {{ currency.code }} - {{ currency.name }}
        </SelectItem>
      </FormInput>

      <Button :disabled="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Choose Currency
      </Button>
    </div>
  </form>
</template>
