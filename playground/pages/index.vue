<template>
  <div class="space-y-12">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Axiom Playground</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Interactive playground to test all utility functions from the @progestionsoft/axiom library
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        to="/string"
        class="card hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <span class="text-2xl">📝</span>
          </div>
          <span class="text-2xl">→</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">String Utilities</h3>
        <p class="text-gray-600 text-sm mb-4">slugify, capitalize, truncate, randomString</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">4 functions</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/number"
        class="card hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <span class="text-2xl">🔢</span>
          </div>
          <span class="text-2xl">→</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Number Utilities</h3>
        <p class="text-gray-600 text-sm mb-4">formatNumber, clamp, roundTo, percent</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">4 functions</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/date"
        class="card hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <span class="text-2xl">📅</span>
          </div>
          <span class="text-2xl">→</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Date Utilities</h3>
        <p class="text-gray-600 text-sm mb-4">formatDate, timeAgo, isValidDate</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">3 functions</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/object"
        class="card hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
            <span class="text-2xl">🎁</span>
          </div>
          <span class="text-2xl">→</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Object Utilities</h3>
        <p class="text-gray-600 text-sm mb-4">deepClone, merge, omit, pick</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">4 functions</span>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/array"
        class="card hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <span class="text-2xl">📚</span>
          </div>
          <span class="text-2xl">→</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Array Utilities</h3>
        <p class="text-gray-600 text-sm mb-4">unique, chunk, flatten, groupBy</p>
        <div class="flex gap-2 flex-wrap">
          <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">4 functions</span>
        </div>
      </NuxtLink>
    </div>

    <div class="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">Ready to use in your project?</h3>
      <p class="text-gray-700 mb-4">
        Install
        <a href="https://www.npmjs.com/package/@progestionsoft/axiom" class="text-primary-600 hover:underline">@progestionsoft/axiom via npm</a>
      </p>
      <code class="code-block inline-block">npm install @progestionsoft/axiom</code>
    </div>
  </div>
</template>
