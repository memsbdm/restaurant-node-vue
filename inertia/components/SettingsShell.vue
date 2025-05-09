<script setup lang="ts">
import { tuyau } from '~/core/providers/tuyau'
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
    <div class="mx-auto w-full max-w-6xl">
      <h1 class="text-3xl font-semibold">Settings</h1>
    </div>

    <div
      class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
    >
      <nav class="grid text-sm text-muted-foreground -mx-2">
        <Link
          :href="tuyau.$url('settings.profile.update.render')"
          class="link"
          :class="{ active: $page.component === 'settings/profile' }"
        >
          Profile
        </Link>

        <Link
          :href="tuyau.$url('settings.account.update.render')"
          class="link"
          :class="{ active: $page.component === 'settings/account' }"
        >
          Account
        </Link>

        <Link href="/" class="link" :class="{ active: $page.component === 'settings/restaurant' }">
          Restaurant
        </Link>
      </nav>

      <div class="grid gap-6">
        <slot />
      </div>
    </div>
  </main>
</template>

<style scoped>
.link {
  @apply font-semibold p-2 rounded text-primary m-px;

  &.active {
    @apply m-0 border bg-white shadow-sm;
  }
}
</style>
