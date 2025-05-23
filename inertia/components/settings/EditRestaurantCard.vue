<script setup lang="ts">
import RestaurantDto from '#dtos/restaurant'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{ restaurant: RestaurantDto }>()

const isDestroying = ref(false)

const form = useForm({
  name: props.restaurant.name,
  alias: props.restaurant.alias,
  address: props.restaurant.address,
  description: props.restaurant.description,
  phone: props.restaurant.phone,
})

watchEffect(() => {
  form
    .defaults({
      name: props.restaurant.name,
      alias: props.restaurant.alias,
      address: props.restaurant.address,
      description: props.restaurant.description,
      phone: props.restaurant.phone,
    })
    .reset()
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Update Restaurant</CardTitle>
      <CardDescription>Update your restaurant's details</CardDescription>
    </CardHeader>

    <CardContent>
      <form
        class="flex flex-col gap-5"
        id="restaurantUpdateForm"
        @submit.prevent="
          form.put(tuyau.$url('restaurants.update.handle', { params: { id: restaurant.id } }), {
            preserveScroll: true,
          })
        "
      >
        <FormInput label="Name" v-model="form.name" disabled />
        <FormInput
          label="Alias (not visible by customers)"
          v-model="form.alias"
          :error="form.errors.alias"
        />
        <FormInput label="Address" v-model="form.address" disabled />
        <FormInput label="Phone" v-model="form.phone!" :error="form.errors.phone" />
        <FormInput
          label="Description"
          type="textarea"
          v-model="form.description!"
          :error="form.errors.description"
        />
      </form>
    </CardContent>

    <CardFooter class="flex justify-between gap-4 border-t px-6 py-4">
      <Button type="submit" form="restaurantUpdateForm" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Update Restaurant
      </Button>

      <Button variant="destructive" @click="isDestroying = true"> Delete Restaurant </Button>
    </CardFooter>
  </Card>

  <ConfirmDestroyDialog
    v-model:open="isDestroying"
    title="Delete Restaurant?"
    :action-href="tuyau.$url('restaurants.delete.handle', { params: { id: restaurant.id } })"
  >
    Are you sure you'd like to delete your
    <strong>{{ restaurant.name }}</strong> restaurant? All data associated with this restaurant,
    including menus and articles, will be deleted forever.
  </ConfirmDestroyDialog>
</template>
