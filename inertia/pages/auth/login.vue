<script setup lang="ts">
import AppHead from '~/components/AppHead.vue'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })
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
</template>
