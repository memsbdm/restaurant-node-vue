<script setup lang="ts">
import type UserDto from '#dtos/user'

defineProps<{
  user: UserDto
  errors?: Record<string, string>
}>()
</script>

<template>
  <AppHead title="Account Settings" description="Manage your account" />

  <SettingsShell>
    <AccountEmailCard :email="user.email" :errors />
    <DeleteAccountCard :errors />
  </SettingsShell>
</template>
