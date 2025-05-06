<script setup lang="ts">
import MenuDto from '#dtos/menu'
import RestaurantDto from '#dtos/restaurant'
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'
import { router } from '@inertiajs/vue3'

const props = defineProps<{
  menus: MenuDto[]
  restaurant: RestaurantDto
}>()

const list = ref(props.menus)
const { form, dialog, destroy, onSuccess } = useResourceActions<MenuDto>()({
  name: '',
})

watchEffect(() => (list.value = props.menus))

function onEdit(resource: MenuDto) {
  dialog.value.open(resource, {
    name: resource.name,
  })
}

function onDestroyShow(resource: MenuDto) {
  destroy.value.open(resource)
}
</script>

<template>
  <AppHead title="menus" :description="`Manage the menus of ${restaurant.name}`" />

  <div class="w-full max-w-2xl mx-auto bg-background rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-4">Menus</h1>

      <Button size="sm" variant="ghost" @click="dialog.open()">
        <Plus class="w-3 h-3 mr-2" />
        Add Menu
      </Button>
    </div>

    <ul class="flex flex-col">
      <li
        v-for="item in list"
        :key="item.id"
        class="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-slate-100 duration-300 group"
      >
        <div class="flex items-center gap-4">
          <span class="font-semibold">{{ item.name }}</span>
          <span v-if="item.isActive" class="text-sm text-slate-400">(Active)</span>
        </div>

        <div class="flex gap-2">
          <div class="flex items-center space-x-2">
            <Switch
              @click="router.patch(tuyau.$url('menus.active.handle', { params: { id: item.id } }))"
              :model-value="item.isActive"
            />
          </div>

          <Button size="xs" @click="onEdit(item)">
            <Pencil class="w-3 h-3" aria-label="Edit Menu" />
          </Button>
          <Button size="xs" variant="destructive" @click="onDestroyShow(item)">
            <Trash2 class="w-3 h-3" aria-label="Delete Menu" />
          </Button>
        </div>
      </li>
    </ul>

    <FormDialog
      resource="Menu"
      v-model:open="dialog.isOpen"
      :editing="!!dialog.resource?.id"
      :processing="form.processing"
      @create="form.post(tuyau.$url('menus.create.handle'), { onSuccess })"
      @update="
        form.put(tuyau.$url('menus.update.handle', { params: { id: dialog.resource!.id } }), {
          onSuccess,
        })
      "
    >
      <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
    </FormDialog>

    <ConfirmDestroyDialog
      v-model:open="destroy.isOpen"
      title="Delete Menu?"
      :action-href="
        destroy.resource
          ? tuyau.$url('menus.delete.handle', { params: { id: destroy.resource.id } })
          : ''
      "
    >
      Are you sure you'd like to delete your <strong>{{ destroy.resource?.name }}</strong> menu?
    </ConfirmDestroyDialog>
  </div>
</template>
