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
import { useFetchProduct } from '@/composables/useFetchProduct'
import { useProduct } from '../Product/composables/useProduct'

const { items, getProducts, isLoading } = useFetchProduct()
const { products, selectedProduct } = useProduct()

watch(selectedProduct, getProducts)
</script>

<template>
  <div class="p-10">
    <Select v-model="selectedProduct">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Выберите продукт" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Выберите продукт</SelectLabel>
          <SelectItem v-for="product of products" :key="product.id" :value="product.id">
            {{ product.text }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div v-if="isLoading">
      isLoading...
    </div>
    <div v-else>
      <Table :items="items" />
    </div>
  </div>
</template>
