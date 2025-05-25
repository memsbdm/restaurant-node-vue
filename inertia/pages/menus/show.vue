<script setup lang="ts">
import type MenuDto from '#dtos/menu'
import type RestaurantDto from '#dtos/restaurant'
import type CategoryDto from '#dtos/category'
import { toRaw } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { router } from '@inertiajs/vue3'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  restaurant: RestaurantDto
  menu: MenuDto
  categories: CategoryDto[]
}>()

const actions = ref()
const internalMenu = ref({ ...props.menu })
const internalCategories = ref(structuredClone(toRaw(props.categories)))

watchEffect(() => (internalMenu.value = { ...props.menu }))
watchEffect(() => (internalCategories.value = structuredClone(toRaw(props.categories))))
</script>

<template>
  <AppHead :title="menu.name" :description="`Manage your menu ${menu.name}`" />

  <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl p-4">
    <div class="flex flex-wrap items-center justify-between mb-6">
      <div class="px-4 flex items-center gap-2">
        <Switch
          @click.stop="router.patch(tuyau.$url('menus.active.handle', { params: { id: menu.id } }))"
          :model-value="menu.isActive"
        />
        <span v-if="menu.isActive" class="text-green-500 text-sm font-medium">Active</span>
        <span v-else class="text-red-500 text-sm font-medium">Not active</span>
      </div>

      <div class="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" @click="actions.edit(internalMenu)">
          <Pencil class="w-3 h-3 mr-1" />
          Rename
        </Button>

        <Button
          size="sm"
          variant="ghost"
          class="hover:text-red-500"
          @click="actions.destroy(internalMenu)"
        >
          <Trash2 class="w-3 h-3 mr-1" />
          Delete
        </Button>
      </div>
    </div>
    <h1 class="px-4 text-2xl font-bold">{{ menu.name }}</h1>

    <div class="px-2">
      <div class="border-b border-slate-200 text-slate-400 text-sm p-2 mb-2">
        {{ categories.length }} Categories, {{ menu.meta.articles_count }} Articles
      </div>
      <SortableCategories v-model="internalCategories" :menu="menu" />
    </div>

    <MenuActions ref="actions" />
  </div>
</template>
