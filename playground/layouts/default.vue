<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <AppHeader />

    <!-- Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div class="mx-auto max-w-7xl">
          <slot />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/app/AppHeader.vue'
import AppFooter from '@/components/app/AppFooter.vue'
</script>
