<script setup lang="ts">
import type OptionCategoryDto from '#dtos/option_category'
import type OptionDto from '#dtos/option'
import { computed } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import Sortable from 'vuedraggable'
import { Pencil, Plus, GripVertical, EllipsisVertical } from 'lucide-vue-next'
import CreateOptionDto from '#dtos/create_option'
import { ref } from 'vue'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  articleId: string
  modelValue: OptionCategoryDto
}>()

const emit = defineEmits(['update:modelValue', 'end'])

const optionCategory = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<OptionDto>()({
  name: '',
  priceInCents: undefined as number | undefined,
  optionCategoryId: optionCategory.value.id,
})

const dialogFocusEl = ref()

function onEdit(resource: OptionDto) {
  dialog.value.open(resource, new CreateOptionDto(resource))
}
</script>

<template>
  <Sortable
    v-model="optionCategory.options"
    item-key="id"
    tag="ul"
    group="options"
    handle=".handle"
    @end="$emit('end')"
  >
    <template #item="{ element: option }">
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
            {{ optionCategory.order }}.{{ option.order }}
          </span>
          <span class="font-medium">{{ option.name }}</span>

          <div class="opacity-0 group-hover:opacity-100 duration-300 ml-2 relative">
            <Button
              variant="ghost"
              size="icon"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7"
              @click="onEdit(option)"
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
              <DropdownMenuItem @click="onEdit(option)">Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>
    </template>
  </Sortable>

  <ul>
    <li class="flex gap-2 mx-auto mt-6 mb-4 justify-center">
      <Button variant="outline" size="sm" class="flex gap-2">
        <Plus class="w-4 h-4" />
        Add Option
      </Button>
    </li>
  </ul>

  <FormDialog
    resource="Option"
    v-model:open="dialog.isOpen"
    :editing="!!dialog.resource?.id"
    :processing="form.processing"
    @create="
      form.post(tuyau.$url('options.create.handle'), {
        onSuccess,
        preserveScroll: true,
      })
    "
  >
    <FormInput
      ref="dialogFocusEl"
      label="Name"
      v-model="form.name"
      :error="form.errors.name"
      placeholder="My option..."
    />

    <FormInput
      label="Price"
      v-model="form.priceInCents"
      :error="form.errors.priceInCents"
      placeholder="3.00"
      type="number"
      step="0.01"
    />
  </FormDialog>
</template>
