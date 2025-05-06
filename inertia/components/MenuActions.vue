<script setup lang="ts">
import MenuDto from '#dtos/menu'
import { nextTick, ref } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import { tuyau } from '~/core/providers/tuyau'

const dialogFocusEl = ref()

const { form, dialog, destroy, onSuccess } = useResourceActions<MenuDto>()({
  name: '',
})

function onCreate() {
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onEdit(menu: MenuDto) {
  dialog.value.open(menu, {
    name: menu.name,
  })
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}

function onDestroy(menu: MenuDto) {
  destroy.value.open(menu)
}

defineExpose({
  create: onCreate,
  edit: onEdit,
  destroy: onDestroy,
})
</script>

<template>
  <FormDialog
    resource="Menu"
    v-model:open="dialog.isOpen"
    :editing="!!dialog.resource?.id"
    :processing="form.processing"
    @create="form.post(tuyau.$url('menus.create.handle'), { onSuccess })"
    @update="
      form.put(
        tuyau.$url('menus.update.handle', {
          params: { id: dialog.resource ? dialog.resource.id : '' },
        }),
        {
          onSuccess,
        }
      )
    "
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My menu..."
    />
  </FormDialog>

  <ConfirmDestroyDialog
    v-model:open="destroy.isOpen"
    title="Delete Menu?"
    :action-href="
      destroy.resource
        ? tuyau.$url('menus.delete.handle', {
            params: { id: destroy.resource?.id },
          })
        : ''
    "
  >
    Are you sure you'd like to delete your
    <strong>{{ destroy.resource?.name }}</strong> menu?
  </ConfirmDestroyDialog>
</template>
