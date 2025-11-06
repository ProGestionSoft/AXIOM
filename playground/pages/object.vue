<template>
  <div class="space-y-6">
    <div class="space-y-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">deepClone</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Object (JSON)</label>
            <textarea
              v-model="deepCloneInput"
              class="input min-h-24 font-mono text-sm"
              placeholder='{"a": 1, "b": {"c": 2}}'
            />
          </div>
          <button @click="executeDeepClone" class="btn btn-primary w-full">
            Clone Object
          </button>
          <div v-if="deepCloneResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ deepCloneResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">merge</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Object 1</label>
              <textarea
                v-model="mergeInput1"
                class="input min-h-20 font-mono text-sm"
                placeholder='{"a": 1}'
              />
            </div>
            <div>
              <label class="label">Object 2</label>
              <textarea
                v-model="mergeInput2"
                class="input min-h-20 font-mono text-sm"
                placeholder='{"b": 2}'
              />
            </div>
          </div>
          <button @click="executeMerge" class="btn btn-primary w-full">
            Merge Objects
          </button>
          <div v-if="mergeResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ mergeResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">omit</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Object (JSON)</label>
            <textarea
              v-model="omitInput"
              class="input min-h-20 font-mono text-sm"
              placeholder='{"a": 1, "b": 2, "c": 3}'
            />
          </div>
          <div>
            <label class="label">Keys to omit (comma-separated)</label>
            <input
              v-model="omitKeys"
              type="text"
              placeholder="a, b"
              class="input"
            />
          </div>
          <button @click="executeOmit" class="btn btn-primary w-full">
            Omit Keys
          </button>
          <div v-if="omitResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ omitResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">pick</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Object (JSON)</label>
            <textarea
              v-model="pickInput"
              class="input min-h-20 font-mono text-sm"
              placeholder='{"a": 1, "b": 2, "c": 3}'
            />
          </div>
          <div>
            <label class="label">Keys to pick (comma-separated)</label>
            <input
              v-model="pickKeys"
              type="text"
              placeholder="a, c"
              class="input"
            />
          </div>
          <button @click="executePick" class="btn btn-primary w-full">
            Pick Keys
          </button>
          <div v-if="pickResult" class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-sm font-mono text-primary-600 block overflow-x-auto">{{ pickResult }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deepClone, merge, omit, pick } from '@progestionsoft/axiom';

definePageMeta({
  layout: 'function'
});

const deepCloneInput = ref('{"a": 1, "b": {"c": 2}}');
const deepCloneResult = ref('');
const mergeInput1 = ref('{"a": 1, "x": 10}');
const mergeInput2 = ref('{"b": 2, "x": 20}');
const mergeResult = ref('');
const omitInput = ref('{"a": 1, "b": 2, "c": 3}');
const omitKeys = ref('b, c');
const omitResult = ref('');
const pickInput = ref('{"a": 1, "b": 2, "c": 3}');
const pickKeys = ref('a, c');
const pickResult = ref('');

const parseJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

const executeDeepClone = () => {
  const obj = parseJSON(deepCloneInput.value);
  if (obj) {
    deepCloneResult.value = JSON.stringify(deepClone(obj), null, 2);
  }
};

const executeMerge = () => {
  const obj1 = parseJSON(mergeInput1.value);
  const obj2 = parseJSON(mergeInput2.value);
  if (obj1 && obj2) {
    mergeResult.value = JSON.stringify(merge(obj1, obj2), null, 2);
  }
};

const executeOmit = () => {
  const obj = parseJSON(omitInput.value);
  if (obj) {
    const keys = omitKeys.value.split(',').map(k => k.trim()) as any[];
    omitResult.value = JSON.stringify(omit(obj, keys), null, 2);
  }
};

const executePick = () => {
  const obj = parseJSON(pickInput.value);
  if (obj) {
    const keys = pickKeys.value.split(',').map(k => k.trim()) as any[];
    pickResult.value = JSON.stringify(pick(obj, keys), null, 2);
  }
};

onMounted(() => {
  executeDeepClone();
});
</script>
