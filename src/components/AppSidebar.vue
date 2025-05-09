<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useUser } from '@/composables/useUser'
import { Box, Home, ScanLine } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const { logout } = useUser()

const items = [
  {
    title: 'Главная',
    name: 'root',
    icon: Home,
  },
  {
    title: 'Товары',
    name: 'products',
    icon: Box,
  },
  {
    title: 'Товар',
    name: 'product',
    icon: ScanLine,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <RouterLink :to="{ name: item.name }">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Button @click="logout">
              Выйти
            </Button>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
