<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import CategoriesTable from '@/components/CategoriesTable.vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useCategories } from '@/composables/useCategories'
import type { ICategory } from '@/interfaces/Product'

const { categories, isLoading, errMessage, updateCategory, createCategory, initCategories } = useCategories()

const formSchema = toTypedSchema(z.object({
  name: z.string({ message: 'Заполните поле' }),
  description: z.string({ message: 'Заполните поле' }),
}))

const form = useForm({
  validationSchema: formSchema,
})

async function handleUpdateItem(item: ICategory) {
  const itemIndex = categories.value.findIndex(i => i.id === item.id)
  if (itemIndex !== -1) {
    categories.value[itemIndex] = { ...categories.value[itemIndex], ...item }
  }
  categories.value = [...categories.value]
  await updateCategory(item.id, {
    name: item.name,
    description: item.description,
  })
}

// watch(selectedProduct, getProducts)

const onSubmit = form.handleSubmit(async (values) => {
  await createCategory(values)
  await initCategories()
  form.resetForm()
})
</script>

<template>
  <div class="p-10">
    <div class="p-10">
      <form class="group w-full" @submit="onSubmit">
        <div class="w-full flex gap-3.5">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="w-full">
              <FormLabel>Название категории</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Название" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem class="w-full">
              <FormLabel>Описание товара</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Описание" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          class="col-span-2 mt-[20px] w-[30%]"
          variant="outline"
          size="sm"
          type="submit"
        >
          Создать
        </Button>
        {{ errMessage }}
      </form>
    </div>

    <div>
      <Spinner v-show="isLoading" class="size-8 m-auto text-yellow-500" />
      <CategoriesTable v-show="!isLoading" :items="categories" @update:item="handleUpdateItem" />
    </div>
  </div>
</template>
