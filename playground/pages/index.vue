<template>
  <div class="relative">
    <!-- Hero Section avec gradient moderne -->
    <div class="relative overflow-hidden pt-8">
      <!-- Header Content -->
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <!-- Badge -->
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            <IconCircleCheckFilled class="h-4 w-4" />
            <span>Interactive Testing Environment</span>
          </div>

          <!-- Main Title -->
          <h1 class="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Axiom
            <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Playground</span>
          </h1>

          <!-- Description -->
          <p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
            Discover and test powerful utility functions from the
            <span class="font-semibold text-slate-900">@progestionsoft/axiom</span> library.
            Interactive examples with real-time results.
          </p>

          <!-- Stats -->
          <div class="mx-auto mt-10 flex max-w-md items-center justify-center gap-8 text-center">
            <div>
              <div class="text-3xl font-bold text-slate-900">19+</div>
              <div class="text-sm text-slate-600">Functions</div>
            </div>
            <div class="h-12 w-px bg-slate-200"></div>
            <div>
              <div class="text-3xl font-bold text-slate-900">5</div>
              <div class="text-sm text-slate-600">Categories</div>
            </div>
            <div class="h-12 w-px bg-slate-200"></div>
            <div>
              <div class="text-3xl font-bold text-slate-900">100%</div>
              <div class="text-sm text-slate-600">Type Safe</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Utility Cards Grid -->
    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UtilityCard />
      </div>
    </div>

    <!-- CTA Section -->
    <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 shadow-2xl sm:px-16 lg:py-16">
        <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500 opacity-10 blur-3xl"></div>

        <div class="relative">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to boost your productivity?
            </h2>
            <p class="mb-8 text-lg leading-relaxed text-slate-300">
              Install <span class="font-semibold text-white">@progestionsoft/axiom</span> in your project and start
              using powerful utilities right away.
            </p>

            <!-- Installation Command -->
            <div class="mx-auto max-w-lg rounded-xl bg-slate-950/50 p-6 backdrop-blur-sm ring-1 ring-slate-700">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs font-medium text-slate-400">INSTALLATION</span>
                <button :class="[
                  'rounded-md px-2 py-1 text-xs font-medium transition-all duration-300',
                  copyState === 'idle'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : copyState === 'success'
                      ? 'bg-emerald-800 text-emerald-300'
                      : 'bg-red-800 text-red-300'
                ]" @click="copyToClipboard('npm install @progestionsoft/axiom')" :disabled="copyState === 'success'">
                  <span v-if="copyState === 'idle'">Copy</span>
                  <span v-else-if="copyState === 'success'" class="flex items-center gap-1">
                    <IconCheck class="h-3 w-3" />
                    Copied!
                  </span>
                  <span v-else class="flex items-center gap-1">
                    <IconX class="h-3 w-3" />
                    Failed
                  </span>
                </button>
              </div>
              <code :class="[
                'block font-mono text-sm transition-all duration-300',
                copyAnimation ? 'text-emerald-400 scale-105' : 'text-emerald-400'
              ]" @animationend="copyAnimation = false">
                npm install @progestionsoft/axiom
              </code>
            </div>

            <!-- Links -->
            <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.npmjs.com/package/@progestionsoft/axiom" target="_blank"
                class="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-transform duration-200 hover:scale-105">
                <IconBrandNpm class="h-5 w-5" />
                View on NPM
              </a>
              <a href="https://github.com/progestionsoft/axiom" target="_blank"
                class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                <IconBrandGithub class="h-5 w-5" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div class="text-center">
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <IconBolt class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="mb-2 text-lg font-semibold text-slate-900">Lightning Fast</h3>
          <p class="text-sm text-slate-600">Optimized utilities with minimal overhead</p>
        </div>

        <div class="text-center">
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <IconShieldCheck class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="mb-2 text-lg font-semibold text-slate-900">Type Safe</h3>
          <p class="text-sm text-slate-600">Full TypeScript support with strict types</p>
        </div>

        <div class="text-center">
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <IconAdjustmentsAlt class="h-6 w-6 text-amber-600" />
          </div>
          <h3 class="mb-2 text-lg font-semibold text-slate-900">Zero Dependencies</h3>
          <p class="text-sm text-slate-600">Lightweight with no external dependencies</p>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <transition name="toast">
      <div v-if="showToast"
        class="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3 shadow-lg ring-1 ring-emerald-200">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
          <IconCheck class="h-4 w-4 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-emerald-900">Copied to clipboard!</p>
          <p class="text-xs text-emerald-700">npm install @progestionsoft/axiom</p>
        </div>
        <button @click="showToast = false" class="rounded p-1 text-emerald-500 hover:bg-emerald-100">
          <IconX class="h-4 w-4" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandNpm,
  IconCircleCheckFilled,
  IconBolt,
  IconShieldCheck,
  IconAdjustmentsAlt,
  IconCheck,
  IconX
} from '@tabler/icons-vue'

// Copy functionality
const copyState = ref<'idle' | 'success' | 'error'>('idle');
const copyAnimation = ref(false);
const showToast = ref(false);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copyState.value = 'success';
    copyAnimation.value = true;
    showToast.value = true;

    setTimeout(() => {
      copyState.value = 'idle';
    }, 2000);

    setTimeout(() => {
      showToast.value = false;
    }, 3000);

  } catch (err) {
    console.error('Failed to copy:', err);
    copyState.value = 'error';

    setTimeout(() => {
      copyState.value = 'idle';
    }, 2000);
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.scale-105 {
  transform: scale(1.05);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>