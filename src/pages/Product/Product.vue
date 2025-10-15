<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
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
import { useApiProduct } from '@/composables/useApiProduct'
import { useCategories } from '@/composables/useCategories'
import { useProductFiles } from '@/composables/useProductFiles'
import type { ICreateProduct } from '@/interfaces/Product'

const formSchema = toTypedSchema(z.object({
  categoryId: z.string({ message: 'Требуется выбрать категорию продукта' }),
  name: z.string({ message: 'Заполните поле' }),
  price: z.number({ message: 'Заполните поле' }).min(1, { message: 'Минимальное значение 1' }).max(10000000, { message: 'Максимальное значение 10000000' }).default(1),
  count: z.number({ message: 'Заполните поле' }).min(1, { message: 'Минимальное значение 1' }).max(100000, { message: 'Максимальное значение 100000' }).default(1),
}))

const { createProduct, errMessage } = useApiProduct()
const { categories, selectedCategory: _selectedCategory } = useCategories()
const { images, onChangeFiles } = useProductFiles()

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  createProduct((values as ICreateProduct))
})
</script>

<template>
  <div class="p-10">
    <form class="group" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem>
          <FormLabel>Продукт</FormLabel>
          <FormControl>
            <Select
              :name="componentField.name"
              :model-value="form.values.categoryId"
              @update:model-value="componentField.onChange"
              @blur="componentField.onBlur"
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Выберите продукт" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Выберите категорию продукта</SelectLabel>
                  <SelectItem v-for="category of categories" :key="category.id" :value="String(category.id)">
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
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
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <label for="picture">Picture</label>
        <Input id="picture" multiple type="file" accept="image/*" @change="onChangeFiles" />
      </div>
      <div v-for="img of images" :key="img">
        <img class="w-20 h-20" :src="img" alt="">
      </div>
      <Button variant="outline" class="col-span-2" type="submit">
        Создать
      </Button>
      {{ errMessage }}
    </form>
  </div>
</template>

<style scoped>
 .group > *:not(:last-child) {
  margin-bottom: 0.5rem;
 }
</style>
