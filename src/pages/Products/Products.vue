<script setup lang="ts">
import { useFetchCandles } from '@/composables/useFetchCandles'
import { useFetchDiffusers } from '@/composables/useFetchDiffusers'
import { useFetchSachets } from '@/composables/useFetchSachets'

const { items: itemsSachets } = useFetchSachets({ immediate: true })
const { items: itemsCandles } = useFetchCandles({ immediate: true })
const { items: itemsDiffusers } = useFetchDiffusers({ immediate: true })
</script>

<template>
  <div class="p-10">
    {{ itemsSachets }}
    <br>
    {{ itemsCandles }}
    <br>
    {{ itemsDiffusers }}
  </div>
</template>
