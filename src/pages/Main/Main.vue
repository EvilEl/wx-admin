<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Theme } from '@/components/ui/theme'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <Theme />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
