<template>
  <div class="space-y-6">
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

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">paginate</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Array (JSON)</label>
            <textarea
              v-model="paginateInput"
              class="input min-h-20 font-mono text-sm"
              placeholder='[{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}, {"id": 5}]'
            />
          </div>

          <div class="space-y-3 border-t pt-4">
            <p class="font-semibold text-gray-900">Pagination Type</p>
            <div class="grid grid-cols-3 gap-2">
              <button
                @click="paginationType = 'offset'"
                :class="[
                  'btn',
                  paginationType === 'offset' ? 'btn-primary' : 'btn-secondary'
                ]"
              >
                Offset
              </button>
              <button
                @click="paginationType = 'page'"
                :class="[
                  'btn',
                  paginationType === 'page' ? 'btn-primary' : 'btn-secondary'
                ]"
              >
                Page
              </button>
              <button
                @click="paginationType = 'cursor'"
                :class="[
                  'btn',
                  paginationType === 'cursor' ? 'btn-primary' : 'btn-secondary'
                ]"
              >
                Cursor
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 border-t pt-4">
            <div v-if="paginationType === 'offset'">
              <label class="label">Offset</label>
              <input
                v-model.number="paginateOffset"
                type="number"
                min="0"
                class="input"
              />
            </div>
            <div v-if="paginationType === 'offset'">
              <label class="label">Limit</label>
              <input
                v-model.number="paginateLimit"
                type="number"
                min="1"
                class="input"
              />
            </div>

            <div v-if="paginationType === 'page'">
              <label class="label">Page</label>
              <input
                v-model.number="paginatePage"
                type="number"
                min="1"
                class="input"
              />
            </div>
            <div v-if="paginationType === 'page'">
              <label class="label">Page Size</label>
              <input
                v-model.number="paginatePageSize"
                type="number"
                min="1"
                class="input"
              />
            </div>

            <div v-if="paginationType === 'cursor'">
              <label class="label">Cursor (ID)</label>
              <input
                v-model="paginateCursor"
                type="text"
                placeholder="Leave empty for first page"
                class="input"
              />
            </div>
            <div v-if="paginationType === 'cursor'">
              <label class="label">Limit</label>
              <input
                v-model.number="paginateCursorLimit"
                type="number"
                min="1"
                class="input"
              />
            </div>
          </div>

          <button @click="executePaginate" class="btn btn-primary w-full">
            Execute Pagination
          </button>

          <div v-if="paginateResult" class="result-box">
            <p class="text-sm text-gray-600 mb-2 font-semibold">Result:</p>
            <div class="space-y-2 text-sm font-mono">
              <div v-if="paginateResult.type === 'offset'" class="space-y-1">
                <p><span class="text-gray-600">Type:</span> {{ paginateResult.type }}</p>
                <p><span class="text-gray-600">Offset:</span> {{ paginateResult.offset }}</p>
                <p><span class="text-gray-600">Limit:</span> {{ paginateResult.limit }}</p>
                <p><span class="text-gray-600">Total:</span> {{ paginateResult.total }}</p>
                <p><span class="text-gray-600">Has More:</span> {{ paginateResult.hasMore }}</p>
                <p class="mt-2"><span class="text-gray-600">Data:</span></p>
                <code class="text-primary-600 block pl-4 overflow-x-auto">{{ JSON.stringify(paginateResult.data, null, 2) }}</code>
              </div>
              <div v-else-if="paginateResult.type === 'page'" class="space-y-1">
                <p><span class="text-gray-600">Type:</span> {{ paginateResult.type }}</p>
                <p><span class="text-gray-600">Page:</span> {{ paginateResult.page }}</p>
                <p><span class="text-gray-600">Page Size:</span> {{ paginateResult.pageSize }}</p>
                <p><span class="text-gray-600">Total Pages:</span> {{ paginateResult.totalPages }}</p>
                <p><span class="text-gray-600">Total:</span> {{ paginateResult.total }}</p>
                <p><span class="text-gray-600">Has More:</span> {{ paginateResult.hasMore }}</p>
                <p class="mt-2"><span class="text-gray-600">Data:</span></p>
                <code class="text-primary-600 block pl-4 overflow-x-auto">{{ JSON.stringify(paginateResult.data, null, 2) }}</code>
              </div>
              <div v-else-if="paginateResult.type === 'cursor'" class="space-y-1">
                <p><span class="text-gray-600">Type:</span> {{ paginateResult.type }}</p>
                <p><span class="text-gray-600">Next Cursor:</span> {{ paginateResult.nextCursor || 'null' }}</p>
                <p><span class="text-gray-600">Prev Cursor:</span> {{ paginateResult.prevCursor || 'null' }}</p>
                <p><span class="text-gray-600">Total:</span> {{ paginateResult.total }}</p>
                <p><span class="text-gray-600">Has More:</span> {{ paginateResult.hasMore }}</p>
                <p class="mt-2"><span class="text-gray-600">Data:</span></p>
                <code class="text-primary-600 block pl-4 overflow-x-auto">{{ JSON.stringify(paginateResult.data, null, 2) }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { unique, chunk, flatten, groupBy, paginate } from '@progestionsoft/axiom';

definePageMeta({
  layout: 'function'
});

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

const paginateInput = ref('[{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}, {"id": 5}, {"id": 6}, {"id": 7}, {"id": 8}, {"id": 9}, {"id": 10}]');
const paginationType = ref<'offset' | 'page' | 'cursor'>('offset');
const paginateOffset = ref(0);
const paginateLimit = ref(2);
const paginatePage = ref(1);
const paginatePageSize = ref(2);
const paginateCursor = ref('');
const paginateCursorLimit = ref(2);
const paginateResult = ref<any>(null);

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

const executePaginate = () => {
  const arr = parseJSON(paginateInput.value);
  if (arr && Array.isArray(arr)) {
    try {
      if (paginationType.value === 'offset') {
        paginateResult.value = paginate(arr, {
          type: 'offset',
          offset: paginateOffset.value,
          limit: paginateLimit.value,
        });
      } else if (paginationType.value === 'page') {
        paginateResult.value = paginate(arr, {
          type: 'page',
          page: paginatePage.value,
          pageSize: paginatePageSize.value,
        });
      } else if (paginationType.value === 'cursor') {
        paginateResult.value = paginate(arr, {
          type: 'cursor',
          cursor: paginateCursor.value || null,
          limit: paginateCursorLimit.value,
          getCursorValue: (item: any) => String(item.id),
        });
      }
    } catch (error: any) {
      paginateResult.value = { error: error.message };
    }
  }
};

onMounted(() => {
  executeUnique();
  executePaginate();
});
</script>
