<script setup lang="ts">
import { tuyau } from '~/core/providers/tuyau'
import { useForm } from '@inertiajs/vue3'
import { AlertCircle, Loader } from 'lucide-vue-next'
import AppHead from '~/components/AppHead.vue'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })

defineProps<{
  errors?: Record<string, string>
}>()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})
</script>

<template>
  <AppHead title="Login" description="Login to your account." />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
    <p class="text-sm text-muted-foreground">
      <Link route="auth.register.render" class="text-sm text-muted-foreground">
        Need an account? Register
      </Link>
    </p>
  </div>

  <form @submit.prevent="form.post(tuyau.$url('auth.login.handle'))">
    <Alert v-if="errors?.E_INVALID_CREDENTIALS" variant="destructive" class="mb-6">
      <AlertCircle class="w-4 h-4" />

      <AlertTitle>Error</AlertTitle>

      <AlertDescription>{{ errors.E_INVALID_CREDENTIALS }}</AlertDescription>
    </Alert>

    <div class="grid gap-3">
      <FormInput
        label="Email"
        type="email"
        v-model="form.email"
        :error="form.errors.email"
        required
      />

      <FormInput
        label="Password"
        type="password"
        v-model="form.password"
        :error="form.errors.password"
        required
      />

      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <Checkbox v-model="form.remember" />
          <span class="text-sm">Remember me</span>
        </div>

        <Link route="auth.forgot-password.render" class="text-sm underline">Forgot Password</Link>
      </div>
      <Button type="submit" :disabled="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Login
      </Button>
    </div>
  </form>
</template>
