<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { ref } from 'vue'
import { tuyau } from '~/core/providers/tuyau'

defineProps<{
  email: string
  errors?: Record<string, string>
}>()

const form = useForm({
  email: '',
  password: '',
})

const formSent = ref(false)

function handleFormSubmit() {
  formSent.value = true
  form.patch(tuyau.$url('settings.account.update.email.handle'), {
    onSuccess: () => form.reset(),
    preserveScroll: true,
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Update Email</CardTitle>
      <CardDescription>Update your email address.</CardDescription>
    </CardHeader>

    <CardContent>
      <form id="accountEmailForm" class="grid gap-4" @submit.prevent="handleFormSubmit">
        <InvalidCredentialsAlert v-if="formSent" :errors="errors" />

        <FormInput
          v-model="form.email"
          type="email"
          label="Email"
          :error="form.errors.email"
          :placeholder="email"
          required
        />

        <FormInput
          v-model="form.password"
          label="Confirm Password"
          type="password"
          placeholder="Please confirm your password to change your email"
          :error="form.errors.password"
          required
        />
      </form>
    </CardContent>

    <CardFooter class="border-t px-6 py-4">
      <Button form="accountEmailForm" type="submit" :disabled="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Update Email
      </Button>
    </CardFooter>
  </Card>
</template>
