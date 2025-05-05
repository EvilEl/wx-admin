<script setup lang="ts">
import { filesApi } from '@/api/files'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProductFiles } from '@/composables/useProductFiles'

import { onMounted, ref } from 'vue'
import { useProduct } from './composables/useProduct'

const { products, selectedProduct } = useProduct()
const { images, sendFile, getFilesProduct, onChangeFiles } = useProductFiles()

onMounted(() => {
  getFilesProduct(1)
})
</script>

<template>
  <div>
    <Select v-model="selectedProduct">
      <SelectTrigger>
        <SelectValue placeholder="Выберите товар" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Выберите товар</SelectLabel>
          <SelectItem v-for="product of products" :key="product.id" :value="product.id">
            {{ product.text }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <input type="text">

    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="picture">Picture</Label>
      <Input id="picture" multiple type="file" accept="image/*" @change="onChangeFiles" />
    </div>
    <div v-for="img of images" :key="img">
      <img class="w-20 h-20" :src="img" alt="">
    </div>

    <Button @click="sendFile">
      загрузить файлы
    </Button>
  </div>
</template>
