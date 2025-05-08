<script setup lang="ts">
import ArticleDto from '#dtos/article'
import CategoryDto from '#dtos/category'
import type MenuDto from '#dtos/menu'
import { EllipsisVertical, GripVertical, Pencil, Plus } from 'lucide-vue-next'
import { nextTick } from 'vue'
import { ref } from 'vue'
import { computed } from 'vue'
import Sortable from 'vuedraggable'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'
import CreateArticleDto from '#dtos/create_article'
import { router } from '@inertiajs/vue3'
const props = defineProps<{
  menu: MenuDto
  modelValue: CategoryDto
}>()

const emit = defineEmits(['update:modelValue', 'end'])
const dialogFocusEl = ref()

const category = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<ArticleDto>()({
  name: '',
  description: '',
  price: undefined as number | undefined,
  categoryId: category.value.id,
  image: undefined as File | undefined,
})

const fileInput = ref()
const image = ref()
const showDeleteAlert = ref(false)

function onCreate() {
  image.value = undefined
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onEdit(resource: ArticleDto) {
  image.value = undefined
  dialog.value.open(resource, new CreateArticleDto(resource))
  nextTick(() => {
    const input = dialogFocusEl.value.inputEl.$el
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  })
}

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
</script>

<template>
  <Sortable
    v-model="category.articles"
    item-key="id"
    tag="ul"
    group="articles"
    handle=".handle"
    @end="$emit('end')"
  >
    <template #item="{ element: article }">
      <li
        class="flex flex-wrap items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-slate-50 duration-300 group relative"
      >
        <div class="flex flex-1 max-w-full items-center gap-4">
          <div
            class="text-slate-400 hover:text-slate-950 handle cursor-move opacity-0 group-hover:opacity-100 duration-300 absolute top-1/2 -translate-y-1/2 right-full pl-2"
          >
            <GripVertical class="w-4 h-4" />
          </div>
          <span class="text-slate-400 slashed-zero w-[3ch] text-sm hangle cursor-move">
            {{ category.order }}.{{ article.order }}
          </span>
          <span class="font-medium">{{ article.name }}</span>
          <span v-if="!article.imageUrl" class="text-orange-400 text-xs items-center gap-2">
            Missing image
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <span class="text-slate-500 text-sm slashed-zero hidden md:inline-block">{{
                  article.description.length > 50
                    ? article.description.substring(0, 50) + '...'
                    : article.description
                }}</span>
              </TooltipTrigger>

              <TooltipContent>
                <span>{{ article.description }}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
            <Button
              variant="ghost"
              size="icon"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
              @click="onEdit(article)"
            >
              <Pencil class="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div class="flex gap-2 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger class="ml-2 text-slate-400 hover:text-slate-950 duration-300">
              <EllipsisVertical class="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="onEdit(article)">Edit</DropdownMenuItem>
              <DropdownMenuItem @click="destroy.open(article)">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>
    </template>
  </Sortable>

  <ul>
    <li class="px-2 ml-[3ch]">
      <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
        <Plus class="w-4 h-4" />
        Add Article
      </Button>
    </li>
  </ul>

  <FormDialog
    resource="Article"
    v-model:open="dialog.isOpen"
    :editing="!!dialog.resource?.id"
    :processing="form.processing"
    @create="
      form.post(tuyau.$url('articles.create.handle'), {
        onSuccess,
        preserveScroll: true,
      })
    "
    @update="
      form.put(
        dialog.resource
          ? tuyau.$url('articles.update.handle', { params: { id: dialog.resource.id } })
          : '',
        {
          onSuccess,
          preserveScroll: true,
        }
      )
    "
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My category..."
      required
    />

    <FormInput
      label="Description"
      v-model="form.description"
      :error="form.errors.description"
      placeholder="A cool description..."
      required
    />

    <FormInput
      label="Price"
      v-model="form.price"
      :error="form.errors.price"
      placeholder="3.00"
      type="number"
      step="0.01"
      required
    />

    <Label for="image">Image (optional)</Label>
    <div class="flex gap-2">
      <Input type="file" ref="fileInput" @input="onFileChange($event.target.files[0])" />
      <Button v-if="image" variant="destructive" @click.prevent="onDeleteImage"
        >Delete preview</Button
      >
      <Button
        v-if="dialog.resource?.imageUrl && !image"
        variant="destructive"
        @click.prevent="onDeleteImage"
        >Delete image</Button
      >
    </div>
    <div v-if="form.errors?.image" class="text-red-500 text-sm">
      {{ form.errors.image }}
    </div>

    <div v-if="dialog.resource?.imageUrl || image" class="w-full h-[220px] relative">
      <div
        v-if="dialog.resource?.imageUrl && !image"
        class="absolute inset-0 bg-cover"
        :style="{ backgroundImage: `url(${dialog.resource.imageUrl})` }"
      ></div>
      <div
        v-if="image"
        class="absolute inset-0 bg-cover"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Article?"
    :action-href="
      destroy.resource
        ? tuyau.$url('articles.delete.handle', {
            params: { id: destroy.resource.id },
          })
        : ''
    "
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> article? All this article's data, will be deleted.
  </ConfirmDestroyDialog>

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
                dialog.resource
                  ? tuyau.$url('articles.delete.image.handle', {
                      params: { id: dialog.resource?.id },
                    })
                  : ''
              )
              dialog.resource!.imageUrl = null
            }
          "
          >Continue</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
