<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { tuyau } from '~/core/providers/tuyau'
import AuthLayout from '~/layouts/AuthLayout.vue'
import AppHead from '~/components/AppHead.vue'
import type RestaurantInviteDto from '#dtos/restaurant_invite'

defineOptions({ layout: AuthLayout })

const props = defineProps<{
  invite?: RestaurantInviteDto
}>()

const form = useForm({
  fullName: '',
  email: props.invite?.email ?? '',
  password: '',
})
</script>

<template>
  <AppHead title="Register" description="Create your account to start using our platform" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
    <p class="text-sm text-muted-foreground">
      <Link route="auth.login.render">Have an account? Login</Link>
    </p>
  </div>

  <form
    class="grid gap-3"
    @submit.prevent="
      form.post(tuyau.$url('auth.register.handle'), { onSuccess: () => form.reset() })
    "
  >
    <FormInput
      label="Full Name"
      v-model="form.fullName"
      :error="form.errors.fullName"
      required
      :disabled="form.processing"
    />

    <FormInput
      label="Email"
      type="email"
      v-model="form.email"
      :error="form.errors.email"
      :disabled="form.processing || !!invite"
      required
    />

    <FormInput
      label="Password"
      type="password"
      v-model="form.password"
      :error="form.errors.password"
      :disabled="form.processing"
      required
    />

    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      Register
    </Button>
  </form>
</template>
