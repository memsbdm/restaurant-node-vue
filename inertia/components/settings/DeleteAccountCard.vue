<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { tuyau } from '~/core/providers/tuyau'
import { AlertCircle, Loader } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps<{
  errors?: Record<string, string>
}>()

const form = useForm({
  password: '',
})

const formSent = ref(false)

function handleFormSubmit() {
  formSent.value = true
  form.delete(tuyau.$url('settings.account.delete.handle'), { preserveScroll: true })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Delete Account</CardTitle>
      <CardDescription>Delete your account and all your data.</CardDescription>
    </CardHeader>

    <CardContent>
      <form id="accountDeleteForm" class="grid gap-4" @submit.prevent="handleFormSubmit">
        <InvalidCredentialsAlert v-if="formSent" :errors="errors" />
        <Alert v-if="errors?.E_FORBIDDEN" variant="destructive" class="mb-3">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription
            >You must delete all your restaurants before deleting your account.</AlertDescription
          >
        </Alert>

        <FormInput
          v-model="form.password"
          type="password"
          label="Password"
          placeholder="Please enter your account password to confirm deletion"
          :error="form.errors.password"
          required
        />
      </form>
    </CardContent>

    <CardFooter class="border-t px-6 py-4">
      <Button form="accountDeleteForm" variant="destructive" type="submit">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Delete Account
      </Button>
    </CardFooter>
  </Card>
</template>
