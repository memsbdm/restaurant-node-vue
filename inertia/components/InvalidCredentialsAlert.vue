<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

defineProps<{
  errors?: Record<string, string>
}>()
</script>

<template>
  <Alert v-if="errors?.E_INVALID_CREDENTIALS" variant="destructive" class="mb-3">
    <AlertCircle class="w-4 h-4" />

    <AlertTitle>Error</AlertTitle>

    <AlertDescription>{{ errors.E_INVALID_CREDENTIALS }}</AlertDescription>
  </Alert>
</template>
