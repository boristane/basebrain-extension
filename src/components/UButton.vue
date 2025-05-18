<template>
  <button
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      sizeClasses[size],
      variantClasses[variant][color],
      block ? 'w-full' : ''
    ]"
    v-bind="$attrs"
  >
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'solid',
    validator: (value) => ['solid', 'soft', 'ghost', 'link'].includes(value)
  },
  color: {
    type: String,
    default: 'gray'
  },
  block: {
    type: Boolean,
    default: false
  },
  padded: {
    type: Boolean,
    default: true
  }
})

const sizeClasses = {
  xs: 'h-6 px-2 text-xs rounded',
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-md',
  xl: 'h-14 px-8 text-lg rounded-lg'
}

const variantClasses = {
  solid: {
    green: 'bg-green-500 text-white hover:bg-green-600',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    red: 'bg-red-500 text-white hover:bg-red-600'
  },
  soft: {
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    red: 'bg-red-50 text-red-600 hover:bg-red-100'
  },
  ghost: {
    gray: 'hover:bg-gray-100 text-gray-600',
    green: 'hover:bg-green-50 text-green-600',
    red: 'hover:bg-red-50 text-red-600'
  },
  link: {
    gray: 'text-gray-600 hover:text-gray-900 hover:underline',
    green: 'text-green-600 hover:text-green-700 hover:underline',
    red: 'text-red-600 hover:text-red-700 hover:underline'
  }
}
</script>