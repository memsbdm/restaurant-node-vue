<script setup lang="ts">
import UserDto from '#dtos/user'
import { UserCircle } from 'lucide-vue-next'
import ToastManager, { type Toast } from '~/components/ToastManager.vue'
import { Link } from '@inertiajs/vue3'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  user: UserDto
  messages: Record<string, Toast>
}>()
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
    >
      <Navigation v-bind="props" />

      <!-- User Panel -->

      <div class="flex flex-1 items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <UserCircle class="w-5 h-5" />

              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ user.fullName }}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem :as="Link" :href="tuyau.$url('home.render')">
              Profile Settings
            </DropdownMenuItem>

            <DropdownMenuItem :as="Link" :href="tuyau.$url('home.render')">
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem :as="Link" :href="tuyau.$url('home.render')">
              Restaurant Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              :as="Link"
              :href="tuyau.$url('auth.logout.handle')"
              method="delete"
              class="w-full"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <slot />
    </main>

    <ToastManager :messages="messages" />
  </div>
</template>
