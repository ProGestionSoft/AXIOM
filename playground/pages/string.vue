<template>
  <div class="space-y-6">
    <div class="space-y-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">slugify</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Text to slugify</label>
            <input v-model="slugifyInput" type="text" placeholder="Enter text..." class="input" />
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ slugifyResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">capitalize</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Text to capitalize</label>
            <input v-model="capitalizeInput" type="text" placeholder="Enter text..." class="input" />
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ capitalizeResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">truncate</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Text to truncate</label>
            <input v-model="truncateInput" type="text" placeholder="Enter text..." class="input" />
          </div>
          <div>
            <label class="label">Max length</label>
            <input v-model.number="truncateLength" type="number" min="1" class="input" />
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ truncateResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">randomString</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Length</label>
            <input v-model.number="randomLength" type="number" min="1" max="100" class="input" />
          </div>
          <button @click="generateRandom" class="btn btn-primary w-full">
            Generate Random String
          </button>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ randomResult }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { slugify, capitalize, truncate, randomString } from '@progestionsoft/axiom';

definePageMeta({
  layout: 'function'
});

const slugifyInput = ref('Hello World! 🚀');
const capitalizeInput = ref('hello world');
const truncateInput = ref('Lorem ipsum dolor sit amet consectetur adipiscing elit');
const truncateLength = ref(20);
const randomLength = ref(10);
const randomResult = ref('');

const slugifyResult = computed(() => slugify(slugifyInput.value));
const capitalizeResult = computed(() => capitalize(capitalizeInput.value));
const truncateResult = computed(() => truncate(truncateInput.value, truncateLength.value));

const generateRandom = () => {
  randomResult.value = randomString(randomLength.value);
};

onMounted(() => {
  generateRandom();
});
</script>
