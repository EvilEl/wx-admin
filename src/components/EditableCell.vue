<script setup lang="ts">
import { Check, Edit2, X } from 'lucide-vue-next'
import { nextTick, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  value: string | number
  type?: 'text' | 'number'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<{
  update: [value: string | number]
}>()

const isEditing = ref(false)
const editValue = ref(props.value)
const inputRef = ref<HTMLInputElement>()

async function startEdit() {
  isEditing.value = true
  editValue.value = props.value
  await nextTick()
}

function saveEdit() {
  const newValue = props.type === 'number' ? Number(editValue.value) : editValue.value
  emit('update', newValue)
  isEditing.value = false
}

function cancelEdit() {
  editValue.value = props.value
  isEditing.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div class="group relative" @click="startEdit">
    <div v-if="!isEditing" class="flex items-center justify-between">
      <span>{{ value }}</span>
      <Button
        variant="ghost"
        size="sm"
        class="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        @click="startEdit"
      >
        <Edit2 class="h-3 w-3" />
      </Button>
    </div>

    <div v-else class="flex items-center gap-1">
      <Input
        ref="inputRef"
        v-model="editValue"
        :type="type"
        class="h-8"
        @keydown="handleKeydown"
      />
      <Button
        variant="ghost"
        size="sm"
        class="h-6 w-6 p-0 text-green-600 hover:text-green-700"
        @click.stop="saveEdit"
      >
        <Check class="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        class="h-6 w-6 p-0 text-red-600 hover:text-red-700"
        @click.stop="cancelEdit"
      >
        <X class="h-3 w-3" />
      </Button>
    </div>
  </div>
</template>
