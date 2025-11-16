<template>
  <div class="contents">
    <NuxtLink
      v-for="card in utilityCards"
      :key="card.path"
      :to="card.path"
      class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl"
      :class="card.hoverRingClass"
    >
      <!-- Icon -->
      <div
        class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
        :class="card.iconBgClass"
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
          :class="card.tagClass"
        >
          {{ tag }}
        </span>
      </div>

      <!-- CTA -->
      <div class="flex items-center text-sm font-semibold" :class="card.textColorClass">
        <span class="transition-transform duration-300 group-hover:translate-x-1">Explore</span>
        <IconChevronRight class="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      <!-- Background Gradient -->
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        :class="card.bgGradientClass"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { IconChevronRight, IconLetterA, IconNumber, IconCalendar, IconBox, IconList, IconCalendarBolt } from '@tabler/icons-vue'

interface UtilityCard {
  path: string;
  label: string;
  description: string;
  icon: any;
  color: string;
  tags: string[];
  hoverRingClass: string;
  iconBgClass: string;
  tagClass: string;
  textColorClass: string;
  bgGradientClass: string;
}

const utilityCards: UtilityCard[] = [
  {
    path: '/string',
    label: 'String Utilities',
    description: 'Manipulate and transform strings with ease',
    icon: IconLetterA,
    color: 'blue',
    tags: ['slugify', 'capitalize', 'truncate', '+1 more'],
    hoverRingClass: 'hover:ring-2 hover:ring-blue-500',
    iconBgClass: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30',
    tagClass: 'bg-blue-50 text-blue-700',
    textColorClass: 'text-blue-600',
    bgGradientClass: 'from-blue-50 to-transparent'
  },
  {
    path: '/number',
    label: 'Number Utilities',
    description: 'Format, calculate and transform numbers',
    icon: IconNumber,
    color: 'emerald',
    tags: ['formatNumber', 'clamp', 'roundTo', '+1 more'],
    hoverRingClass: 'hover:ring-2 hover:ring-emerald-500',
    iconBgClass: 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/30',
    tagClass: 'bg-emerald-50 text-emerald-700',
    textColorClass: 'text-emerald-600',
    bgGradientClass: 'from-emerald-50 to-transparent'
  },
  {
    path: '/date',
    label: 'Date Utilities',
    description: 'Parse, format and manipulate dates',
    icon: IconCalendar,
    color: 'amber',
    tags: ['formatDate', 'timeAgo', 'isValidDate'],
    hoverRingClass: 'hover:ring-2 hover:ring-amber-500',
    iconBgClass: 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/30',
    tagClass: 'bg-amber-50 text-amber-700',
    textColorClass: 'text-amber-600',
    bgGradientClass: 'from-amber-50 to-transparent'
  },
  {
    path: '/object',
    label: 'Object Utilities',
    description: 'Deep clone, merge and transform objects',
    icon: IconBox,
    color: 'rose',
    tags: ['deepClone', 'merge', 'omit', '+1 more'],
    hoverRingClass: 'hover:ring-2 hover:ring-rose-500',
    iconBgClass: 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/30',
    tagClass: 'bg-rose-50 text-rose-700',
    textColorClass: 'text-rose-600',
    bgGradientClass: 'from-rose-50 to-transparent'
  },
  {
    path: '/array',
    label: 'Array Utilities',
    description: 'Manipulate arrays with powerful functions',
    icon: IconList,
    color: 'violet',
    tags: ['unique', 'chunk', 'flatten', '+1 more'],
    hoverRingClass: 'hover:ring-2 hover:ring-violet-500',
    iconBgClass: 'bg-gradient-to-br from-violet-500 to-violet-600 shadow-violet-500/30',
    tagClass: 'bg-violet-50 text-violet-700',
    textColorClass: 'text-violet-600',
    bgGradientClass: 'from-violet-50 to-transparent'
  },
  {
    path: '/formatter',
    label: 'Formatter Utilities',
    description: 'Format options for date formatting',
    icon: IconCalendarBolt,
    color: 'sky',
    tags: ['full', 'compact', 'long', '+7 more'],
    hoverRingClass: 'hover:ring-2 hover:ring-sky-500',
    iconBgClass: 'bg-gradient-to-br from-sky-500 to-sky-600 shadow-sky-500/30',
    tagClass: 'bg-sky-50 text-sky-700',
    textColorClass: 'text-sky-600',
    bgGradientClass: 'from-sky-50 to-transparent'
  }
]
</script>