<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })
</script>

<template>
  <Head title="Homepage" />

  <Button>Shadcn is working</Button>
</template>
