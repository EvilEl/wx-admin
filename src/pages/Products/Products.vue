<script setup lang="ts">
import { watch } from 'vue'
import Table from '@/components/Table.vue'
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
import { useFetchProduct } from '@/composables/useFetchProduct'
import type { IProductBase } from '@/interfaces/Product'

const { items, getProducts, isLoading } = useFetchProduct()
const { categories, selectedCategory } = useCategories()
const { updateProduct } = useApiProduct()

async function handleUpdateItem(item: IProductBase) {
  const itemIndex = items.value.findIndex(i => i.id === item.id)
  if (itemIndex !== -1) {
    items.value[itemIndex] = { ...items.value[itemIndex], ...item }
  }
  items.value = [...items.value]
  await updateProduct(item.id, {
    name: item.name,
    price: item.price,
    count: item.count,
  })
}

watch(selectedCategory, getProducts)
</script>

<template>
  <div class="p-10">
    <Select v-model="selectedCategory">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Выберите продукт" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Выберите категорию продукта</SelectLabel>
          <SelectItem v-for="product of categories" :key="product.id" :value="product.id">
            {{ product.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div v-if="isLoading">
      isLoading...
    </div>
    <div v-else>
      <Table :items="items" @update:item="handleUpdateItem" />
    </div>
  </div>
</template>
