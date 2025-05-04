<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import PlaceAutocomplete from '~/components/google/PlaceAutocomplete.vue'
import { tuyau } from '~/core/providers/tuyau'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })

const form = useForm({
  id: '',
})
</script>

<template>
  <AppHead title="Add Your Restaurant" description="Add your restaurant" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Add Your Restaurant</h1>

    <p class="text-sm text-muted-foreground">
      To get started, you'll need to provide your restaurant information.
    </p>
  </div>

  <form @submit.prevent="form.post(tuyau.$url('restaurants.create.handle'))">
    <div class="grid gap-3">
      <PlaceAutocomplete v-model="form.id" :error="form.errors.id" />
      <Button :disabled="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Add Restaurant
      </Button>
    </div>
  </form>
</template>
