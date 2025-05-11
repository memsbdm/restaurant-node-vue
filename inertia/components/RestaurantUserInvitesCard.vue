<script setup lang="ts">
import RestaurantInviteDto from '#dtos/restaurant_invite'
import RoleDto from '#dtos/role'
import { Role } from '#enums/role'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  invites: RestaurantInviteDto[]
  roles: RoleDto[]
}>()

const inviteForm = useForm({
  email: '',
  roleId: Role.User,
})

const inviteFormOptions = {
  onSuccess: () => inviteForm.reset(),
  preserveScroll: true,
}

function getRoleName(roleId: number) {
  return props.roles.find((role) => role.id === roleId)?.name
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Pending Restaurant Invitations</CardTitle>
      <CardDescription> The following users have been invited to your restaurant. </CardDescription>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invite in invites" :key="invite.id">
            <TableCell>{{ invite.email }}</TableCell>
            <TableCell>{{ getRoleName(invite.roleId) }}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow v-if="!invites?.length">
            <TableCell colspan="3">
              <div class="text-center text-slate-600">No pending invites.</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div class="p-4 rounded bg-slate-100 mt-8">
        <h4 class="font-bold">Invite New Member</h4>
        <div class="text-slate-400 text-sm mb-3">Invite a new member to your restaurant.</div>

        <form
          class="flex flex-wrap items-end gap-4"
          @submit.prevent="
            inviteForm.post(tuyau.$url('settings.restaurant.invite.user.handle'), inviteFormOptions)
          "
        >
          <FormInput
            label="Email"
            type="email"
            class="flex-1"
            v-model="inviteForm.email"
            :error="inviteForm.errors.email"
            :disabled="inviteForm.processing"
            required
          />

          <FormInput
            label="Role"
            type="select"
            v-model="inviteForm.roleId"
            :error="inviteForm.errors.roleId"
            :disabled="inviteForm.processing"
          >
            <SelectItem v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </SelectItem>
          </FormInput>

          <Button type="submit" :disabled="inviteForm.processing">
            <Loader v-if="inviteForm.processing" class="mr-2 h-4 w-4 animate-spin" />
            Send Invite
          </Button>
        </form>
      </div>
    </CardContent>
  </Card>
</template>
