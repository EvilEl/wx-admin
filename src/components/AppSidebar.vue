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

const { logout } = useUser()

const items = [
  {
    title: 'Главная',
    url: '/',
    icon: Home,
  },
  {
    title: 'Товары',
    url: 'products',
    icon: Box,
  },
  {
    title: 'Товар',
    url: 'product',
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
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
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
