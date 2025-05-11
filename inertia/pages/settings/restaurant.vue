<script setup lang="ts">
import type RestaurantDto from '#dtos/restaurant'
import type RestaurantInviteDto from '#dtos/restaurant_invite'
import type RoleDto from '#dtos/role'
import type UserDto from '#dtos/user'

defineProps<{
  restaurant: RestaurantDto
  user: UserDto
  users: UserDto[]
  roles: RoleDto[]
  invites: RestaurantInviteDto[]
}>()
</script>

<template>
  <AppHead title="Restaurant Settings" :description="`Manage your ${restaurant.name} restaurant`" />

  <SettingsShell>
    <EditRestaurantCard :restaurant="restaurant" />
    <RestaurantUsersCard :user="user" :users="users" :roles="roles" />
    <RestaurantUserInvitesCard :invites="invites" :roles="roles" />
  </SettingsShell>
</template>
