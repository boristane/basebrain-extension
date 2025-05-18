<template>
  <div
    :class="[
      'flex items-start gap-3 p-4 rounded-lg',
      variantClasses[variant][color]
    ]"
  >
    <div class="flex-shrink-0">
      <slot name="icon">
        <svg v-if="icon === 'heroicons:exclamation-triangle'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
      </slot>
    </div>
    <div class="flex-1">
      <p v-if="description" class="text-sm">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'gray'
  },
  variant: {
    type: String, 
    default: 'soft'
  },
  icon: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  }
})

const variantClasses = {
  soft: {
    orange: 'bg-orange-50 text-orange-700',
    red: 'bg-red-50 text-red-700',
    green: 'bg-green-50 text-green-700',
    gray: 'bg-gray-50 text-gray-700',
    blue: 'bg-blue-50 text-blue-700'
  },
  subtle: {
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800', 
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800'
  }
}
</script>