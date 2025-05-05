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
import { toBase64 } from '@/lib/utils'
import { onMounted, ref } from 'vue'

import { useProduct } from './composables/useProduct'

const api = filesApi()
const { products, selectedProduct } = useProduct()

const files = ref<File[] | null>(null)
const images = ref<string[]>([])

onMounted(() => {
  getFilesProduct(1)
})

async function getFilesProduct(id: number = 1) {
  const files = await api.getFilesProduct(id)
  if (files.length === 0) {
    return
  }

  console.log(files)

  files.forEach(item => {
    images.value.push(item.base64)
  })
}

async function sendFiles() {
  if (!files.value) {
    return
  }
  for (const file of files.value) {
    try {
      const base64 = await toBase64(file)
      images.value.push(base64)
      const data = {
        filename: file.name,
        idProduct: 1,
        originalname: file.name,
        mimeType: file.type,
        size: file.size,
        link: '',
        base64,
      }
      api.createFile(data)
    } catch (error) {
      console.log(error)
    }
  }
  files.value = []
}

function onChangeFiles(e) {
  files.value = e.target.files
}
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

    <Button @click="sendFiles">
      загрузить файлы
    </Button>
  </div>
</template>
