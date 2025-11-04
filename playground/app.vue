<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Axiom Playground</h1>
            <p class="text-xs text-gray-600">Test utility functions</p>
          </div>
        </NuxtLink>
        <nav class="flex gap-6">
          <NuxtLink to="/string" class="text-gray-700 hover:text-primary-600 transition-colors">String</NuxtLink>
          <NuxtLink to="/number" class="text-gray-700 hover:text-primary-600 transition-colors">Number</NuxtLink>
          <NuxtLink to="/date" class="text-gray-700 hover:text-primary-600 transition-colors">Date</NuxtLink>
          <NuxtLink to="/object" class="text-gray-700 hover:text-primary-600 transition-colors">Object</NuxtLink>
          <NuxtLink to="/array" class="text-gray-700 hover:text-primary-600 transition-colors">Array</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NuxtPage />
    </main>

    <footer class="bg-gray-900 text-gray-400 mt-20 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
        <p>Built with <span class="text-primary-400">❤</span> by <a href="https://progestionsoft.netlify.app/about" target="_blank" class="text-primary-400 hover:text-primary-300">ProGestionSoft</a></p>
        <p class="mt-2">Learn more at <a href="https://github.com/progestionsoft/axiom" target="_blank" class="text-primary-400 hover:text-primary-300">github.com/progestionsoft/axiom</a></p>
      </div>
    </footer>
  </div>
</template>
