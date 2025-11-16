<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-body">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NOAHChatModal />
  </main>
</template>

<script setup lang="ts">
import { NOAHChatModal } from '@/components/noahBot'

const runtimeConfig = useRuntimeConfig();
const sharedFilesUrl = runtimeConfig.public.pgsSharedFiles;

const heroImagePath = `${sharedFilesUrl}/_General/Images/defaultMetaImg.png`;
const baseUrl = "https://pgs-axiom.netlify.app";

useHead({
  titleTemplate: '%s | AXIOM',
  meta: [
    {
      key: 'description',
      name: 'description',
      content: 'Bibliothèque d\'utilitaires moderne pour les développeurs JavaScript/TypeScript.'
    },

    // Open Graph (Facebook, LinkedIn)
    { property: 'og:title', content: 'Axio - Bibliothèque d\'utilitaires moderne pour les développeurs JavaScript/TypeScript' },
    { property: 'og:description', content: 'Développer en toute simplicité.' },
    { property: 'og:image', content: heroImagePath },
    { property: 'og:url', content: baseUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Axio - Bibliothèque d\'utilitaires moderne pour les développeurs JavaScript/TypeScript' },
    { name: 'twitter:description', content: 'Développer en toute simplicité.' },
    { name: 'twitter:image', content: heroImagePath },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
    { rel: 'canonical', href: baseUrl }
  ]
});
</script>

