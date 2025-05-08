<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import CategoryDto from '#dtos/category'
import type MenuDto from '#dtos/menu'
import { EllipsisVertical, GripVertical, Pencil, Plus } from 'lucide-vue-next'
import { nextTick } from 'vue'
import { ref } from 'vue'
import { computed } from 'vue'
import Sortable from 'vuedraggable'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  menu: MenuDto
  modelValue: CategoryDto[]
}>()

const emit = defineEmits(['update:modelValue'])
const dialogFocusEl = ref()

const categories = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<CategoryDto>()({
  name: '',
  description: '',
})

function onCreate() {
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onEdit(resource: CategoryDto) {
  dialog.value.open(resource, { name: resource.name, description: resource.description ?? '' })
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onCategoryOrderChange() {
  const ids = categories.value.map((category) => category.id)
  router.patch(
    tuyau.$url('categories.order.handle', { params: { menuId: props.menu.id } }),
    { ids },
    { preserveScroll: true }
  )
}

function onArticleOrderChange() {
  const data = categories.value.map((category) => ({
    id: category.id,
    articles: category.articles.map((article) => article.id),
  }))
  router.patch(
    tuyau.$url('articles.order.handle', { params: { menuId: props.menu.id } }),
    { categories: data },
    { preserveScroll: true }
  )
}
</script>

<template>
  <Sortable
    v-model="categories"
    item-key="id"
    tag="ul"
    group="categories"
    handle=".handle"
    @end="onCategoryOrderChange"
  >
    <template #item="{ element: category, index }">
      <li class="flex flex-col border-b border-slate-200 pb-2 mb-2">
        <div
          class="flex items-center justify-between rounded-md p-2 hover:bg-slate-50 duration-300 group relative"
        >
          <div class="flex items-center gap-4">
            <div
              class="text-slate-400 hover:text-slate-950 handle cursor-move opacity-0 group-hover:opacity-100 duration-300 absolute top-1/2 -translate-y-1/2 right-full pl-2"
            >
              <GripVertical class="w-4 h-4" />
            </div>
            <span class="font-bold">{{ category.name }}</span>

            <span v-if="!category.description" class="text-orange-400 text-xs items-center gap-2">
              Missing description
            </span>

            <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
              <Button
                variant="ghost"
                size="icon"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
                @click="onEdit(category)"
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
                <DropdownMenuItem @click="onEdit(category)">Edit</DropdownMenuItem>
                <DropdownMenuItem @click="destroy.open(category)">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <SortableArticles v-model="categories[index]" :menu="menu" @end="onArticleOrderChange" />
      </li>
    </template>
  </Sortable>

  <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
    <Plus class="w-4 h-4" />
    Add Category
  </Button>

  <FormDialog
    resource="Category"
    v-model:open="dialog.isOpen"
    :editing="!!dialog.resource?.id"
    :processing="form.processing"
    @create="
      form.post(tuyau.$url('categories.create.handle', { params: { menuId: menu.id } }), {
        onSuccess,
        preserveScroll: true,
      })
    "
    @update="
      form.put(
        dialog.resource
          ? tuyau.$url('categories.update.handle', {
              params: { menuId: menu.id, categoryId: dialog.resource.id },
            })
          : '',
        { onSuccess, preserveScroll: true }
      )
    "
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My category..."
    />

    <FormInput
      type="textarea"
      label="Description"
      v-model="form.description"
      :error="form.errors.description"
      placeholder="A cool description..."
    />
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Category?"
    :action-href="
      destroy.resource
        ? tuyau.$url('categories.delete.handle', {
            params: { menuId: menu.id, categoryId: destroy.resource.id },
          })
        : ''
    "
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> category? All this category's data, including
    articles, will be deleted.
  </ConfirmDestroyDialog>
</template>
