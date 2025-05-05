<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { tuyau } from '~/core/providers/tuyau'
import AuthLayout from '~/layouts/AuthLayout.vue'
import { Loader, Info } from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })
defineProps<{ isSent: boolean }>()

const form = useForm({
  email: '',
})
</script>

<template>
  <AppHead title="Forgot Your Password?" description="Reset your password" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Forgot Your Password?</h1>

    <p class="text-sm text-muted-foreground">
      No worries! Enter your email below and, if we found a matching account, we will send you a
      password reset link.
    </p>
  </div>

  <Alert v-if="isSent">
    <Info class="w-4 h-4" />
    <AlertTitle>Please Check Your Email</AlertTitle>
    <AlertDescription
      >We have sent a password reset link to your email. Please check your email and click on the
      link to reset your password.
    </AlertDescription>
  </Alert>
  <form
    @submit.prevent="
      form.post(tuyau.$url('auth.forgot-password.send'), {
        onSuccess: () => form.reset(),
        preserveScroll: true,
      })
    "
  >
    <div class="grid gap-3">
      <FormInput
        label="Email"
        type="email"
        v-model="form.email"
        :error="form.errors.email"
        :required="true"
      />

      <Button type="submit" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Email Reset Link
      </Button>
    </div>
  </form>
</template>
