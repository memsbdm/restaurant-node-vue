<script setup lang="ts">
import type OptionCategoryDto from '#dtos/option_category'
import { computed, nextTick, ref } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import Sortable from 'vuedraggable'
import { EllipsisVertical, GripVertical, Plus } from 'lucide-vue-next'
import { OptionCategoryTypeText } from '#enums/option_category_type'
import { tuyau } from '~/core/providers/tuyau'
import type OptionCategoryTypeDto from '#dtos/option_category_type'

const props = defineProps<{
  articleId: string
  modelValue: OptionCategoryDto[]
  optionCategoryTypes: OptionCategoryTypeDto[]
}>()

const emit = defineEmits(['update:modelValue'])
const dialogFocusEl = ref()

const optionCategories = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const { form, dialog, destroy, onSuccess } = useResourceActions<OptionCategoryDto>()({
  name: '',
  typeId: props.optionCategoryTypes[0].id,
})

function onCreate() {
  dialog.value.open()
  nextTick(() => dialogFocusEl.value.inputEl.$el.focus())
}
</script>

<template>
  <div class="px-3 pt-5">
    <h2 class="text-2xl font-bold mb-6 mt-4">Options</h2>

    <Sortable
      v-model="optionCategories"
      item-key="id"
      tag="ul"
      group="option-categories"
      handle=".handle"
    >
      <template #item="{ element }: { element: OptionCategoryDto }">
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
              <span class="font-bold">{{ element.name }}</span>
              <span class="text-xs text-slate-500">{{
                OptionCategoryTypeText[element.typeId]
              }}</span>
            </div>

            <div class="flex gap-2 items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger class="ml-2 text-slate-400 hover:text-slate-950 duration-300">
                  <EllipsisVertical class="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
      </template>
    </Sortable>

    <Button variant="ghost" size="sm" class="flex gap-2" @click="onCreate">
      <Plus class="w-4 h-4" />
      Add Category
    </Button>

    <FormDialog
      resource="Option Category"
      v-model:open="dialog.isOpen"
      :editing="!!dialog.resource?.id"
      :processing="form.processing"
      @create="
        form.post(
          tuyau.$url('option-categories.create.handle', { params: { articleId: articleId } }),
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
        placeholder="My option category..."
      />

      <FormInput type="select" v-model="form.typeId" label="Type" :error="form.errors.typeId">
        <SelectItem v-for="type in optionCategoryTypes" :key="type.id" :value="type.id">
          {{ type.name }}
        </SelectItem>
      </FormInput>
    </FormDialog>
  </div>
</template>
