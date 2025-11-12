<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 hover:scale-105 overflow-hidden transition-all duration-300">
            <div class="hidden lg:block">
              <img :src="sharedFiles.paths.logo.dc" alt="Logo" class="h-8 w-auto sm:h-10 dark:hidden" />
              <img :src="sharedFiles.paths.logo.dw" alt="Logo" class="h-8 w-auto sm:h-10 hidden dark:block" />
            </div>
            <div class="lg:hidden flex-shrink-0 mr-3">
              <img :src="sharedFiles.paths.logo.mc" alt="Logo" class="h-8 w-auto sm:h-10 dark:hidden" />
              <img :src="sharedFiles.paths.logo.mw" alt="Logo" class="h-8 w-auto sm:h-10 hidden dark:block" />
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex gap-4 lg:gap-6">
            <NuxtLink v-for="item in navItems" :key="item.name" :to="item.path"
              class="text-gray-700 hover:text-primary-600 transition-colors text-sm lg:text-base">
              {{ item.name }}
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <IconMenu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <IconX v-else class="w-6 h-6" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <transition enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4">
          <nav v-if="isMobileMenuOpen" class="md:hidden pt-4 pb-2 border-t border-gray-200 mt-3">
            <div class="flex flex-col space-y-3">
              <NuxtLink v-for="item in navItems" :key="item.name" :to="item.path"
                class="text-gray-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                @click="isMobileMenuOpen = false">
                {{ item.name }}
              </NuxtLink>
            </div>
          </nav>
        </transition>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div class="mx-auto max-w-7xl">
          <slot />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 mt-12 sm:mt-20 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <!-- Copyright -->
          <p class="text-sm sm:text-base text-center sm:text-left order-2 sm:order-1">
            © {{ new Date().getFullYear() }} AXIOM.
            Built with <span class="text-primary-400">❤</span> by
            <a href="https://progestionsoft.netlify.app/about" target="_blank"
              class="text-primary-400 hover:text-primary-300 transition-colors ml-1">
              ProGestionSoft
            </a>
            <br class="sm:hidden">
            <span class="text-gray-500 text-xs sm:text-sm">and maintained by the community
            </span>
          </p>

          <!-- Liens sociaux -->
          <ul role="list" class="flex justify-center sm:justify-end order-1 sm:order-2">
            <SocialCustomLink />
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconMenu, IconX } from '@tabler/icons-vue'
import { useSharedFiles } from '@/stores/sharedFiles';

const sharedFiles = useSharedFiles();
const isMobileMenuOpen = ref(false)

// navigation
const navItems = [
  { name: 'String', path: '/string' },
  { name: 'Number', path: '/number' },
  { name: 'Date', path: '/date' },
  { name: 'Object', path: '/object' },
  { name: 'Array', path: '/array' }
]
</script>
