<script setup lang="ts">
import { axiosInstance } from '@/api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'

const login = ref('')
const password = ref('')
const showPassword = ref(false)

async function onSubmit(e) {
  try {
    await axiosInstance.post('login', {
      login: login.value,
      password: password.value,
    })
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<template>
  <form class="max-w-sm mx-auto mt-10 p-8 border rounded-lg shadow space-y-6 bg-white" @submit.prevent="onSubmit">
    <h2 class="text-2xl font-semibold text-center mb-4">
      Login
    </h2>
    <div>
      <Label class="flex flex-col items-start">Логин
        <Input v-model="login" type="text" placeholder="Логин" required class="mt-1" />
      </Label>
    </div>
    <div>
      <Label class="flex flex-col items-start">Пароль
        <Input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
          required
          class="mt-1"
        />
      </Label>
      <div class="flex items-center mt-2">
        <Checkbox id="showPassword" v-model="showPassword" />
        <Label for="showPassword" class="ml-2 text-sm">Показать пароль</Label>
      </div>
    </div>
    <Button type="submit" class="w-full">
      Войти
    </Button>
  </form>
</template>
