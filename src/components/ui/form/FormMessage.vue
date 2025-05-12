<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="p"
    :name="toValue(name)"
    :class="cn('text-destructive-foreground text-sm text-red-500', props.class)"
  />
</template>
