<script setup lang="ts">
import { filesApi } from '@/api/files'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateProduct } from '@/composables/useCreateProduct'
import { useProductFiles } from '@/composables/useProductFiles'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import * as z from 'zod'
import { useProduct } from './composables/useProduct'

const formSchema = toTypedSchema(z.object({
  name: z.string({ message: 'Заполните поле' }),
  price: z.number({ message: 'Заполните поле' }).min(1, { message: 'Минимальное значение 1' }).max(10000000, { message: 'Максимальное значение 10000000' }).default(1),
  count: z.number({ message: 'Заполните поле' }).min(1, { message: 'Минимальное значение 1' }).max(100000, { message: 'Максимальное значение 100000' }).default(1),
}))

const { createCandle, errMessage } = useCreateProduct()
const { products, selectedProduct } = useProduct()
const { images, sendFile, getFilesProduct, onChangeFiles } = useProductFiles()

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  createCandle(values)
})

onMounted(() => {
  getFilesProduct(1)
})
</script>

<template>
  <div class="p-10">
    <!-- <Select v-model="selectedProduct">
      <SelectTrigger class="w-full">
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
    </Select> -->
    <form class="grid grid-cols-[1fr_1fr] gap-1" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name" error-message="хуй">
        <FormItem>
          <FormLabel>Наименование</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Наименование" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Цена</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Цена" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="count">
        <FormItem>
          <FormLabel>Количество</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Количество" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="col-span-2" type="submit">
        Создать
      </Button>
    </form>

    <div>
      {{ errMessage }}
    </div>

    <!-- <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="picture">Picture</Label>
      <Input id="picture" multiple type="file" accept="image/*" @change="onChangeFiles" />
    </div>
    <div v-for="img of images" :key="img">
      <img class="w-20 h-20" :src="img" alt="">
    </div>

    <Button @click="sendFile">
      загрузить файлы
    </Button> -->
  </div>
</template>

<style>

</style>
