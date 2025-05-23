<script setup lang="ts">
import { computed, ref } from 'vue'

export type InputType = 'select' | 'textarea' | 'string' | 'password' | 'email' | 'number'

const props = withDefaults(
  defineProps<{
    label?: string
    type?: InputType
    modelValue?: string | number
    placeholder?: string
    error?: string
    disabled?: boolean
    required?: boolean
    step?: string
  }>(),
  {
    type: 'string',
    step: '1',
  }
)

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const inputEl = ref()

defineExpose({
  inputEl,
})
</script>

<template>
  <div class="gap-1 grid">
    <Label class="gap-1 grid">
      <span v-if="label">{{ label }}</span>

      <Textarea
        v-if="type === 'textarea'"
        v-model="internalValue"
        ref="inputEl"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
      />

      <Select
        v-else-if="type === 'select'"
        v-model="internalValue"
        ref="inputEl"
        :disabled="disabled"
        :required="required"
      >
        <SelectTrigger>
          <slot name="trigger">
            <SelectValue :placeholder="placeholder" />
          </slot>
        </SelectTrigger>
        <SelectContent>
          <slot />
        </SelectContent>
      </Select>

      <Input
        v-else-if="type === 'number'"
        v-model="internalValue"
        ref="inputEl"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :step="step"
      />

      <Input
        v-else
        v-model="internalValue"
        ref="inputEl"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
      />
    </Label>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>
