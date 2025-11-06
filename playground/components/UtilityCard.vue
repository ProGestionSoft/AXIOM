<template>
  <NuxtLink 
    :to="card.path"
    class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-2"
    :class="`hover:ring-${card.color}-500`"
  >
    <!-- Icon -->
    <div
      class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
      :class="`bg-gradient-to-br from-${card.color}-500 to-${card.color}-600 shadow-${card.color}-500/30`"
    >
      <component :is="card.icon" class="h-7 w-7 text-white" />
    </div>

    <!-- Content -->
    <h3 class="mb-2 text-xl font-bold text-slate-900">{{ card.label }}</h3>
    <p class="mb-4 text-sm leading-relaxed text-slate-600">
      {{ card.description }}
    </p>

    <!-- Tags -->
    <div class="mb-6 flex flex-wrap gap-2">
      <span 
        v-for="(tag, index) in card.tags" 
        :key="index"
        class="rounded-md px-2 py-1 text-xs font-medium"
        :class="`bg-${card.color}-50 text-${card.color}-700`"
      >
        {{ tag }}
      </span>
    </div>

    <!-- CTA -->
    <div class="flex items-center text-sm font-semibold" :class="`text-${card.color}-600`">
      <span class="transition-transform duration-300 group-hover:translate-x-1">Explore</span>
      <IconChevronRight class="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </div>

    <!-- Background Gradient -->
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :class="`from-${card.color}-50 to-transparent`"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue'

interface UtilityCard {
  path: string;
  label: string;
  count: number;
  icon: any;
  iconColor: string;
  iconBg: string;
  bgGradient: string;
  description: string;
  tags: string[];
  color: string;
}

defineProps<{
  card: UtilityCard
}>()
</script>
