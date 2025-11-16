<template>
  <div class="space-y-6">
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">formatTimestamp</h3>
      <div class="space-y-3">
        <div>
          <label class="label">Timestamp (millisecondes)</label>
          <input 
            v-model.number="timestamp" 
            type="number" 
            placeholder="1756868642754" 
            class="input"
          />
          <button 
            @click="timestamp = Date.now()" 
            class="mt-2 text-sm text-primary-600 hover:text-primary-700"
          >
            Utiliser maintenant
          </button>
        </div>

        <div>
          <label class="label">Format</label>
          <select v-model="selectedFormat" class="input">
            <option value="timestamp">timestamp (original)</option>
            <option value="full">full (vendredi 14 novembre 2025)</option>
            <option value="compact">compact (vend. 14 novembre 2025)</option>
            <option value="long">long (14 novembre 2025)</option>
            <option value="medium">medium (2 janv. 2025)</option>
            <option value="short">short (14/11/2025)</option>
            <option value="datetime">datetime (2 janv. 2025 10:04:02)</option>
            <option value="time">time (22:14:03)</option>
            <option value="iso">iso (2025-11-14T22:14:03.001Z)</option>
            <option value="relative">relative (il y a 2 jours)</option>
          </select>
        </div>

        <div>
          <label class="label">Locale</label>
          <select v-model="selectedLocale" class="input">
            <option value="fr-FR">fr-FR (Français)</option>
            <option value="en-US">en-US (English)</option>
            <option value="de-DE">de-DE (Deutsch)</option>
            <option value="es-ES">es-ES (Español)</option>
            <option value="it-IT">it-IT (Italiano)</option>
          </select>
        </div>

        <div class="result-box">
          <p class="text-sm text-gray-600 mb-1">Résultat:</p>
          <code class="text-lg font-mono text-primary-600 break-all">{{ formattedResult }}</code>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="text-xs text-gray-500 mb-2">Date correspondante:</p>
          <code class="text-sm text-gray-700">{{ new Date(timestamp).toString() }}</code>
        </div>
      </div>
    </div>

    <div class="card bg-blue-50">
      <h4 class="font-semibold text-gray-900 mb-3">Exemples de timestamps</h4>
      <div class="space-y-2">
        <button 
          @click="timestamp = Date.now()"
          class="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm"
        >
          <span class="font-medium">Maintenant:</span>
          <code class="ml-2 text-primary-600">{{ Date.now() }}</code>
        </button>
        <button 
          @click="timestamp = Date.now() - 86400000"
          class="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm"
        >
          <span class="font-medium">Hier:</span>
          <code class="ml-2 text-primary-600">{{ Date.now() - 86400000 }}</code>
        </button>
        <button 
          @click="timestamp = Date.now() - 604800000"
          class="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm"
        >
          <span class="font-medium">Il y a 1 semaine:</span>
          <code class="ml-2 text-primary-600">{{ Date.now() - 604800000 }}</code>
        </button>
        <button 
          @click="timestamp = 1700000000000"
          class="w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-50 text-sm"
        >
          <span class="font-medium">14 nov. 2023:</span>
          <code class="ml-2 text-primary-600">1700000000000</code>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTimestamp } from '@progestionsoft/axiom';
import type { DateFormatType } from '@progestionsoft/axiom';

definePageMeta({
  layout: 'function'
});

const timestamp = ref(Date.now());
const selectedFormat = ref<DateFormatType>('full');
const selectedLocale = ref('fr-FR');

const formattedResult = computed(() => {
  try {
    return formatTimestamp(timestamp.value, selectedFormat.value, selectedLocale.value);
  } catch (error) {
    return 'Erreur de formatage';
  }
});
</script>
