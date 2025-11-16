<template>
  <footer class="bg-gray-900 text-gray-400 mt-12 sm:mt-20 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <!-- Copyright -->
        <p class="text-sm sm:text-base text-center sm:text-left order-2 sm:order-1">
          © {{ new Date().getFullYear() }} AXIOM.
          Built with <span class="text-primary-400">❤</span> by

          <!-- PGS -->
          <span class="inline-flex items-center gap-2 ml-1">
            <div
              class="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
              <img :src="sharedFiles.paths.logo.pgs" alt="PGS" class="w-3.5 h-3.5 object-contain" />
            </div>

            <a :href="footerData?.brandUrl" target="_blank"
              class="text-primary-400 hover:text-primary-300 transition-colors">
              {{ footerData?.brand }}
            </a>
          </span>

          <br class="sm:hidden">
          <span class="text-gray-500 text-xs sm:text-sm">
            and maintained by the community
          </span>
        </p>

        <!-- Liens sociaux -->
        <ul role="list" class="flex justify-center sm:justify-end order-1 sm:order-2">
          <SocialCustomLink />
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconMenu, IconX } from '@tabler/icons-vue'
import { useSharedFiles } from '@/stores/sharedFiles';

const sharedFiles = useSharedFiles();

// Récupérer les données du footer depuis le store
type FooterData = { brand: string; brandUrl: string }
const { data: footerData, pending, error } = await useAsyncData<FooterData>(
  'footerData',
  () => sharedFiles.getFooterData()
)
</script>
