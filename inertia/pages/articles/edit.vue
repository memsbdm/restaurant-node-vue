<script setup lang="ts">
import type ArticleDto from '#dtos/article'
import type CategoryDto from '#dtos/category'
import { router } from '@inertiajs/vue3'
import { ArrowLeft, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import ConfirmDestroyDialog from '~/components/shared/ConfirmDestroyDialog.vue'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  article: ArticleDto
  categories: CategoryDto[]
  menuId: string
}>()

const { form, destroy } = useResourceActions<ArticleDto>()({
  name: props.article.name,
  description: props.article.description,
  price: (props.article.priceInCents / 100).toFixed(2),
  categoryId: props.article.categoryId,
  image: undefined as File | undefined,
  menuId: props.menuId,
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

function onDestroy() {
  destroy.value.open(props.article)
}
</script>

<template>
  <AppHead title="Edit article" description="Edit an article" />

  <div class="w-full max-w-2xl mx-auto bg-background rounded-xl p-4">
    <div class="px-3">
      <div class="flex justify-between">
        <Button variant="link" class="px-0"
          ><Link route="menus.show.render" :params="{ id: menuId }" class="flex gap-1 items-center"
            ><ArrowLeft /> Go back</Link
          ></Button
        >
        <Button variant="ghost" class="hover:text-destructive duration-300" @click="onDestroy"
          ><Trash2 class="flex gap-2 items-center" />Delete</Button
        >
      </div>
      <h1 class="text-2xl font-bold mb-6 mt-4">Edit {{ article.name }}</h1>

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

          <div v-if="form.image || article.imageUrl">
            <Label for="image">Preview</Label>

            <div class="w-full relative">
              <img
                :src="image ?? article.imageUrl"
                alt="Preview of the article"
                class="aspect-[5/4] max-h-[300px]"
              />
            </div>
          </div>
          <Button
            v-if="form.image"
            variant="destructive"
            @click="
              () => {
                form.image = undefined
                image = undefined
              }
            "
            >Remove preview</Button
          >

          <Button
            v-if="!form.image && article.imageUrl"
            variant="destructive"
            @click="onDeleteImage"
            >Remove image</Button
          >
        </div>

        <Button
          type="submit"
          @click="form.put(tuyau.$url('articles.update.handle', { params: { id: article.id } }))"
          :disabled="form.processing"
          class="mt-4"
        >
          Edit</Button
        >
      </form>
    </div>
  </div>

  <AlertDialog v-model:open="showDeleteAlert">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this image from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="showDeleteAlert = false">Cancel</AlertDialogCancel>
        <AlertDialogAction
          @click="
            () => {
              router.delete(
                tuyau.$url('articles.delete.image.handle', {
                  params: { id: article.id },
                })
              )
            }
          "
          >Continue</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Article?"
    :action-href="
      destroy.resource
        ? tuyau.$url('articles.delete.handle', {
            params: { id: destroy.resource?.id, menuId: menuId },
          })
        : ''
    "
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> article?
  </ConfirmDestroyDialog>
</template>
