<script setup lang="ts">
import ArticleDto from '#dtos/article'
import CategoryDto from '#dtos/category'
import type MenuDto from '#dtos/menu'
import { Edit, GripVertical, Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { computed } from 'vue'
import Sortable from 'vuedraggable'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'
import { router } from '@inertiajs/vue3'
const props = defineProps<{
  menu: MenuDto
  modelValue: CategoryDto
}>()

const emit = defineEmits(['update:modelValue', 'end'])

const category = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { dialog, destroy } = useResourceActions<ArticleDto>()({})

const showDeleteAlert = ref(false)
</script>

<template>
  <Sortable
    v-model="category.articles"
    item-key="id"
    tag="ul"
    group="articles"
    handle=".handle"
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    @end="$emit('end')"
  >
    <template #item="{ element: article }">
      <li
        class="handle cursor-move flex flex-col rounded-md px-3 py-1 hover:bg-slate-50 duration-300 group relative min-h-[90px] justify-between border"
      >
        <span class="font-medium mt-1">{{ article.name }}</span>
        <span v-if="!article.imageUrl" class="text-orange-400 text-xs items-center gap-2">
          Missing image
        </span>

        <div class="flex justify-between items-center">
          <span class="text-sm">{{ (article.priceInCents / 100).toFixed(2) }} AED</span>

          <div class="flex opacity-0 group-hover:opacity-100 duration-300 ml-2">
            <Button
              variant="ghost"
              size="icon"
              @click="
                router.get(
                  tuyau.$url('articles.edit.render', {
                    params: { id: article.id, menuId: menu.id },
                  })
                )
              "
            >
              <Pencil />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              class="hover:text-red-500"
              @click="destroy.open(article)"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </li>
    </template>
  </Sortable>

  <ul>
    <li class="flex gap-2 mx-auto mt-6 mb-4 justify-center">
      <Button
        variant="outline"
        size="sm"
        @click="
          router.get(
            tuyau.$url('articles.create.render', {
              params: { menuId: menu.id, categoryId: category.id },
            })
          )
        "
        class="flex gap-2"
      >
        <Plus class="w-4 h-4" />
        Add Article
      </Button>
    </li>
  </ul>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Article?"
    :action-href="
      destroy.resource
        ? tuyau.$url('articles.delete.handle', {
            params: { id: destroy.resource.id, menuId: props.menu.id },
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
            }
          "
          >Continue</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
