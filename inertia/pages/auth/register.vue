<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import AppHead from '~/components/AppHead.vue'

defineOptions({ layout: AuthLayout })
</script>

<template>
  <AppHead title="Register" description="Register to PlotMyCourse." />
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
    <p class="text-sm text-muted-foreground">
      <Link route="auth.login.render" class="text-sm text-muted-foreground">
        Already have an account? Login
      </Link>
    </p>
  </div>
</template>
