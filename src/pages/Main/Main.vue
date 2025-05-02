<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <SidebarTrigger />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
