<script setup lang="ts">
import type RestaurantDto from '#dtos/restaurant'
import type RestaurantInviteDto from '#dtos/restaurant_invite'
import type RoleDto from '#dtos/role'
import type UserDto from '#dtos/user'
import { type Abilities } from '#actions/abilities/get_abilities'

defineProps<{
  restaurant: RestaurantDto
  user: UserDto
  users: UserDto[]
  roles: RoleDto[]
  invites: RestaurantInviteDto[]
  can: Abilities
}>()
</script>

<template>
  <AppHead title="Restaurant Settings" :description="`Manage your ${restaurant.name} restaurant`" />

  <SettingsShell>
    <EditRestaurantCard :restaurant="restaurant" />
    <RestaurantUsersCard :user="user" :users="users" :roles="roles" :can />
    <RestaurantUserInvitesCard :invites="invites" :roles="roles" :can />
  </SettingsShell>
</template>
