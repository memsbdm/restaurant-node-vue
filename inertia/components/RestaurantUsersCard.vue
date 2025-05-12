<script setup lang="ts">
import { tuyau } from '~/core/providers/tuyau'
import { Link } from '@inertiajs/vue3'
import type RoleDto from '#dtos/role'
import type UserDto from '#dtos/user'
import { type Abilities } from '#actions/abilities/get_abilities'

const props = defineProps<{
  users: UserDto[]
  user: UserDto
  roles: RoleDto[]
  can: Abilities
}>()

function getRoleName(roleId: number) {
  return props.roles.find((role) => role.id === roleId)?.name
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Restaurant Members</CardTitle>
      <CardDescription>Members of your restaurant.</CardDescription>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="member in users" :key="member.id">
            <TableCell>
              {{ member.fullName }}
              <span v-if="user.id === member.id" class="text-slate-400 italic inline-block ml-3">
                (You)
              </span>
            </TableCell>
            <TableCell>
              {{ member.email }}
            </TableCell>
            <TableCell>
              {{ getRoleName(member.meta.pivot_role_id) }}
            </TableCell>
            <TableCell>
              <Link
                v-if="can.restaurant.manageUsers || user.id === member.id"
                :href="
                  tuyau.$url('settings.restaurant.remove.user.handle', {
                    params: { id: member.id },
                  })
                "
                method="delete"
                class="text-red-500"
                preserve-scroll
                as="button"
              >
                Remove
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
