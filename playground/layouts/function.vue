<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-slate-100">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary-600 to-primary-800">
              <span class="text-sm font-bold text-white">A</span>
            </div>
            <div>
              <h1 class="text-sm font-bold text-slate-900">Axiom</h1>
              <p class="text-xs text-slate-500">Playground</p>
            </div>
          </NuxtLink>

          <div class="ml-6 hidden items-center gap-2 sm:flex">
            <button class="text-slate-400 transition-colors hover:text-slate-600">
              <IconChevronRight class="h-4 w-4" />
            </button>
            <span class="text-sm font-medium text-slate-900">{{ currentPageLabel }}</span>
          </div>
        </div>

        <button @click="showMobileSidebar = !showMobileSidebar"
          class="lg:hidden rounded-lg p-2 transition-colors hover:bg-slate-100">
          <IconMenuDeep class="h-6 w-6 text-slate-900" v-if="!showMobileSidebar" />
          <IconX class="h-6 w-6 text-slate-900" v-else />
        </button>

        <div class="flex items-center gap-3">
          <a href="https://github.com/progestionsoft/axiom" target="_blank"
            class="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex">
            <IconBrandGithub class="h-5 w-5" />
          </a>

          <a href="https://www.npmjs.com/package/@progestionsoft/axiom" target="_blank"
            class="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex">
            <IconBrandNpm class="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside
        class="fixed inset-y-0 left-0 top-16 z-30 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:top-0 lg:z-0 lg:transform-none lg:flex lg:flex-col"
        :class="showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
        <div class="flex flex-col h-full overflow-y-auto"> <nav class="flex-1 space-y-2 p-4">
            <div class="mb-6 px-3">
              <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500">Utilities</h2>
            </div>

            <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" @click="showMobileSidebar = false"
              :class="[
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isCurrentPage(item.path)
                  ? 'bg-gradient-to-r ' + item.bgGradient + ' text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              ]">
              <div :class="[
                'flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110',
                isCurrentPage(item.path) ? item.bgGradient + ' text-white' : item.iconBg + ' text-' + item.iconColor
              ]">
                <component :is="item.icon" class="h-5 w-5" />
              </div>

              <div class="flex-1">
                <p class="font-medium">{{ item.label }}</p>
                <p :class="isCurrentPage(item.path) ? 'text-blue-100' : 'text-slate-500'" class="text-xs">
                  {{ item.count }} functions
                </p>
              </div>

              <IconCheck v-if="isCurrentPage(item.path)" class="h-5 w-5" />
            </NuxtLink>
          </nav>

          <div class="border-t border-slate-200 bg-white p-4 mt-auto">
            <div class="space-y-2">
              <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Resources</h2>

              <a href="https://www.npmjs.com/package/@progestionsoft/axiom" target="_blank"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100">
                <IconBrandNpm class="h-4 w-4" />
                <span>NPM Package</span>
              </a>

              <a href="https://github.com/progestionsoft/axiom" target="_blank"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100">
                <IconBrandGithub class="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">{{ currentPageLabel }}</h1>
                <p class="mt-1 text-sm text-slate-600">{{ currentPageDescription }}</p>
              </div>
              <button @click="goBack"
                class="hidden rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 sm:inline-flex items-center gap-2">
                <IconArrowLeft class="h-4 w-4" />
                Back
              </button>
            </div>
          </div>
        </div>

        <div class="px-4 py-8 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <slot />
          </div>
        </div>
      </main>
    </div>

    <transition name="fade">
      <div v-if="showMobileSidebar" @click="showMobileSidebar = false"
        class="fixed inset-0 top-16 z-20 bg-black/50 lg:hidden"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import { IconArrowLeft, IconChevronRight, IconMenuDeep, IconX, IconBrandGithub, IconBrandNpm, IconCheck, IconLetterA, IconNumber,
  IconCalendar, IconBox, IconList } from '@tabler/icons-vue'

const showMobileSidebar = ref(false);
const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const navigationItems = [
  {
    path: '/string',
    label: 'String Utilities',
    count: 4,
    icon: IconLetterA,
    iconColor: 'blue-700',
    iconBg: 'bg-blue-100',
    bgGradient: 'from-blue-600 to-blue-700',
    description: 'Test string manipulation functions in real-time',
  },
  {
    path: '/number',
    label: 'Number Utilities',
    count: 4,
    icon: IconNumber,
    iconColor: 'emerald-700',
    iconBg: 'bg-emerald-100',
    bgGradient: 'from-emerald-600 to-emerald-700',
    description: 'Test number formatting and manipulation functions in real-time',
  },
  {
    path: '/date',
    label: 'Date Utilities',
    count: 3,
    icon: IconCalendar,
    iconColor: 'amber-700',
    iconBg: 'bg-amber-100',
    bgGradient: 'from-amber-600 to-amber-700',
    description: 'Test date parsing, formatting and manipulation functions',
  },
  {
    path: '/object',
    label: 'Object Utilities',
    count: 4,
    icon: IconBox,
    iconColor: 'rose-700',
    iconBg: 'bg-rose-100',
    bgGradient: 'from-rose-600 to-rose-700',
    description: 'Test deep clone, merge and object transformation functions',
  },
  {
    path: '/array',
    label: 'Array Utilities',
    count: 4,
    icon: IconList,
    iconColor: 'violet-700',
    iconBg: 'bg-violet-100',
    bgGradient: 'from-violet-600 to-violet-700',
    description: 'Test array manipulation and transformation functions',
  },
];

const isCurrentPage = (path: string) => {
  return route.path === path;
};

const currentPage = computed(() => {
  return navigationItems.find((item) => isCurrentPage(item.path));
});

const currentPageLabel = computed(() => {
  return currentPage.value?.label || 'Axiom Playground';
});

const currentPageDescription = computed(() => {
  return currentPage.value?.description || 'Interactive playground to test utility functions';
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>