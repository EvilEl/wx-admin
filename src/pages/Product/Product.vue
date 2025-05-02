<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useProduct } from './composables/useProduct'

const { products, selectedProduct } = useProduct()
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
  </div>
</template>
