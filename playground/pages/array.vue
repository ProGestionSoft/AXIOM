<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Array Utilities</h2>
      <p class="text-gray-600">Test array manipulation functions in real-time</p>
    </div>

    <div class="space-y-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">unique</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Array (JSON)</label>
            <textarea
              v-model="uniqueInput"
              class="input min-h-20 font-mono text-sm"
              placeholder="[1, 2, 2, 3, 3, 3]"
            />
          </div>
          <button @click="executeUnique" class="btn btn-primary w-full">
            Get Unique Values
          </button>
          <div v-if="uniqueResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ uniqueResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">chunk</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Array (JSON)</label>
              <textarea
                v-model="chunkInput"
                class="input min-h-20 font-mono text-sm"
                placeholder="[1, 2, 3, 4, 5]"
              />
            </div>
            <div>
              <label class="label">Chunk size</label>
              <input
                v-model.number="chunkSize"
                type="number"
                min="1"
                class="input"
              />
            </div>
          </div>
          <button @click="executeChunk" class="btn btn-primary w-full">
            Split into Chunks
          </button>
          <div v-if="chunkResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ chunkResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">flatten</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Array (JSON)</label>
              <textarea
                v-model="flattenInput"
                class="input min-h-20 font-mono text-sm"
                placeholder="[1, [2, [3, [4]]]]"
              />
            </div>
            <div>
              <label class="label">Depth</label>
              <input
                v-model.number="flattenDepth"
                type="number"
                min="0"
                class="input"
              />
            </div>
          </div>
          <button @click="executeFlatten" class="btn btn-primary w-full">
            Flatten Array
          </button>
          <div v-if="flattenResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ flattenResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">groupBy</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Array of objects (JSON)</label>
            <textarea
              v-model="groupByInput"
              class="input min-h-20 font-mono text-sm"
              placeholder='[{"age": 21}, {"age": 22}, {"age": 21}]'
            />
          </div>
          <div>
            <label class="label">Group by key</label>
            <input
              v-model="groupByKey"
              type="text"
              placeholder="age"
              class="input"
            />
          </div>
          <button @click="executeGroupBy" class="btn btn-primary w-full">
            Group By Key
          </button>
          <div v-if="groupByResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ groupByResult }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unique, chunk, flatten, groupBy } from '@progestionsoft/axiom';

const uniqueInput = ref('[1, 2, 2, 3, 3, 3]');
const uniqueResult = ref('');
const chunkInput = ref('[1, 2, 3, 4, 5]');
const chunkSize = ref(2);
const chunkResult = ref('');
const flattenInput = ref('[1, [2, [3, [4]]]]');
const flattenDepth = ref(1);
const flattenResult = ref('');
const groupByInput = ref('[{"age": 21}, {"age": 22}, {"age": 21}]');
const groupByKey = ref('age');
const groupByResult = ref('');

const parseJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

const executeUnique = () => {
  const arr = parseJSON(uniqueInput.value);
  if (arr && Array.isArray(arr)) {
    uniqueResult.value = JSON.stringify(unique(arr), null, 2);
  }
};

const executeChunk = () => {
  const arr = parseJSON(chunkInput.value);
  if (arr && Array.isArray(arr)) {
    chunkResult.value = JSON.stringify(chunk(arr, chunkSize.value), null, 2);
  }
};

const executeFlatten = () => {
  const arr = parseJSON(flattenInput.value);
  if (arr && Array.isArray(arr)) {
    flattenResult.value = JSON.stringify(flatten(arr, flattenDepth.value), null, 2);
  }
};

const executeGroupBy = () => {
  const arr = parseJSON(groupByInput.value);
  if (arr && Array.isArray(arr)) {
    groupByResult.value = JSON.stringify(groupBy(arr, groupByKey.value as any), null, 2);
  }
};

onMounted(() => {
  executeUnique();
});
</script>
