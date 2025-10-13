<script setup lang="ts">
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ChevronDown } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import { toast } from 'vue-sonner'
import EditableCell from '@/components/EditableCell.vue'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { valueUpdater } from '@/components/ui/table/utils'
import { useProductFiles } from '@/composables/useProductFiles'
import type { IProductBase } from '@/interfaces/Product'
import { cn } from '@/lib/utils'
import type {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

const props = defineProps<{ items: IProductBase[] }>()
const emit = defineEmits<{
  'file-removed': []
  'update:item': [item: IProductBase]
}>()

const { onRemoveFileFromProduct } = useProductFiles()

const columnHelper = createColumnHelper<IProductBase>()

const columns = [
  columnHelper.accessor('id', {
    enablePinning: true,
    header: 'Ид',
  }),
  columnHelper.accessor('name', {
    header: 'Название',
    cell: (info) => {
      return h(EditableCell, {
        value: info.getValue(),
        onUpdate: (newValue) => {
          const updatedItem = { ...info.row.original, name: newValue as string }
          emit('update:item', updatedItem)
        },
      })
    },
  }),
  columnHelper.accessor('price', {
    header: 'Цена',
    cell: (info) => {
      return h(EditableCell, {
        value: info.getValue(),
        type: 'number',
        onUpdate: (newValue) => {
          const updatedItem = { ...info.row.original, price: newValue as number }
          emit('update:item', updatedItem)
        },
      })
    },
  }),
  columnHelper.accessor('count', {
    header: 'Количество',
    cell: (info) => {
      return h(EditableCell, {
        value: info.getValue(),
        type: 'number',
        onUpdate: (newValue) => {
          const updatedItem = { ...info.row.original, count: newValue as number }
          emit('update:item', updatedItem)
        },
      })
    },
  }),
  columnHelper.accessor('files', {
    header: 'Файлы',
    cell: (props) => {
      const files = props.getValue()
      const handleRemoveFile = async (fileIndex: number) => {
        const file = files[fileIndex]
        if (file) {
          try {
            await onRemoveFileFromProduct({
              idFile: file.id,
              idProduct: file.idProduct,
            })
            files.splice(fileIndex, 1)
            console.log('toast.success', toast.success)
            toast.success('Файл успешно удален')
            emit('file-removed')
          } catch {
            toast.error('Ошибка при удалении файла')
          }
        }
      }

      return h('div', { class: 'flex gap-1 overflow-x-auto' }, files?.map((file, index) =>
        h('div', {
          key: index,
          class: 'relative group',
        }, [
          h('img', {
            src: file.base64,
            class: 'w-12 h-12 object-cover rounded flex-shrink-0',
          }),
          h('button', {
            onClick: () => handleRemoveFile(index),
            class: 'absolute top-[0px] -right-1 bg-red-500 text-white rounded-full w-[15px] h-[15px] text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center',
          }, '×'),
        ]),
      ))
    },
  }),
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = computed(() => {
  console.log('props.items', props.items)
  return useVueTable({
    data: props.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get columnVisibility() {
        return columnVisibility.value
      },
      get rowSelection() {
        return rowSelection.value
      },
      get expanded() {
        return expanded.value
      },
      columnPinning: {
        left: ['id'],
      },
    },
  })
})
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers" :key="header.id" :data-pinned="header.column.getIsPinned()"
              :class="cn(
                { 'sticky bg-background/95': header.column.getIsPinned() },
                header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
              )"
              :style="{
                maxWidth: header.column.columnDef.maxSize ? `${header.column.columnDef.maxSize}px` : undefined,
                width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : undefined,
              }"
            >
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell
                  v-for="cell in row.getVisibleCells()" :key="cell.id" :data-pinned="cell.column.getIsPinned()"
                  :class="cn(
                    { 'sticky bg-background/95': cell.column.getIsPinned() },
                    cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                  )"
                  :style="{
                    maxWidth: cell.column.columnDef.maxSize ? `${cell.column.columnDef.maxSize}px` : undefined,
                    width: cell.column.columnDef.size ? `${cell.column.columnDef.size}px` : undefined,
                  }"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
