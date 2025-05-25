<script setup lang="ts">
import type CategoryDto from '#dtos/category'
import { useForm } from '@inertiajs/vue3'
import { ArrowLeft, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  categories: CategoryDto[]
  menuId: string
  categoryId: string
}>()

const form = useForm({
  name: '',
  description: '',
  price: undefined,
  categoryId: props.categoryId,
  image: undefined as File | undefined,
  menuId: props.menuId,
  hasOptions: false as boolean,
})

const fileInput = ref()
const image = ref()
const showDeleteAlert = ref(false)

function onFileChange(file: File) {
  image.value = URL.createObjectURL(file)
  form.image = file
}

function onDeleteImage() {
  if (image.value) {
    image.value = undefined

    if (fileInput.value && fileInput.value.$el) {
      fileInput.value.$el.value = ''
    } else if (fileInput.value) {
      fileInput.value.value = ''
    }
  } else {
    showDeleteAlert.value = true
  }
}

function onSubmit(hasOptions: boolean) {
  form.hasOptions = hasOptions
  form.post(tuyau.$url('articles.create.handle'))
}
</script>

<template>
  <AppHead title="Add article" description="Add an article" />

  <div class="w-full max-w-2xl mx-auto bg-background rounded-xl p-4">
    <div class="px-3">
      <Button variant="link" class="px-0"
        ><Link route="menus.show.render" :params="{ id: menuId }" class="flex gap-1 items-center"
          ><ArrowLeft /> Go back</Link
        ></Button
      >
      <h1 class="text-2xl font-bold mb-6 mt-4">Add an article</h1>

      <form @submit.prevent>
        <div class="grid md:grid-cols-2 gap-5 items-start">
          <FormInput label="Name" v-model="form.name" :error="form.errors.name" required />
          <FormInput
            label="Category"
            v-model="form.categoryId"
            :error="form.errors.categoryId"
            type="select"
          >
            <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </SelectItem>
          </FormInput>

          <FormInput
            label="Description"
            v-model="form.description"
            :error="form.errors.description"
            type="textarea"
            class="md:col-span-2"
            required
          />
          <FormInput
            label="Price"
            v-model="form.price"
            :error="form.errors.price"
            type="number"
            min="0"
            step="0.01"
            placeholder="3.00"
          />

          <div class="gap-1 grid">
            <Label for="image">Image (optional)</Label>
            <Input
              type="file"
              ref="fileInput"
              class="px-2 py-1.5"
              @input="onFileChange($event.target.files[0])"
            />
            <span v-if="form.errors?.image" class="text-red-500 text-sm">
              {{ form.errors.image }}
            </span>
          </div>

          <div v-if="image" class="">
            <Label for="image">Preview</Label>

            <div class="w-full relative">
              <img :src="image" alt="Preview of the article" class="aspect-[5/4] max-h-[300px]" />
            </div>
          </div>
          <Button v-if="image" variant="destructive" @click="onDeleteImage">Remove image</Button>
        </div>

        <div class="flex gap-2 mt-8">
          <Button variant="outline" type="submit" @click="onSubmit(true)"
            ><Plus /> Add options</Button
          >
          <Button type="submit" @click="onSubmit(false)">Create</Button>
        </div>
      </form>
    </div>
  </div>
</template>
