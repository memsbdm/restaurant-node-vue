<script lang="ts" setup>
import { Menu, Slash, Route } from 'lucide-vue-next'
import type RestaurantDto from '#dtos/restaurant'
import type UserDto from '#dtos/user'
import type { Toast } from '~/components/ToastManager.vue'
import type { Abilities } from '#actions/abilities/get_abilities'

defineProps<{
  user: UserDto
  messages: Record<string, Toast>
  restaurant: RestaurantDto
  restaurants: RestaurantDto[]
  can: Abilities
}>()
</script>

<template>
  <nav class="hidden gap-5 text-sm items-center md:flex lg:gap-6">
    <Link route="home.render" class="flex items-center gap-2 text-lg font-semibold md:text-base">
      <Route class="h-6 w-6" />

      <span class="sr-only">Restaurant App</span>
    </Link>

    <div class="flex items-center">
      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />

      <RestaurantSelect :restaurant="restaurant" :restaurants="restaurants" :can />

      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />
    </div>

    <Link
      route="menus.create.render"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/menus') }"
    >
      Menus
    </Link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="w-5 h-5" />

        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>

    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <Link route="home.render" class="flex items-center gap-2 text-lg font-semibold">
          <Route class="h-6 w-6" />

          <span class="sr-only">Restaurant App</span>
        </Link>

        <RestaurantSelect :restaurant="restaurant" :restaurants="restaurants" :can />

        <Link
          route="menus.create.render"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/menus') }"
        >
          Menus
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<style scope>
.desktop-link {
  @apply text-muted-foreground transition-colors hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}

.mobile-link {
  @apply text-muted-foreground hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}
</style>
