<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Date Utilities</h2>
      <p class="text-gray-600">Test date formatting and validation functions in real-time</p>
    </div>

    <div class="space-y-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">formatDate</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Date</label>
            <input
              v-model="formatDateInput"
              type="date"
              class="input"
            />
          </div>
          <div>
            <label class="label">Format style</label>
            <select v-model="formatStyle" class="input">
              <option value="short">Short (1/15/2024)</option>
              <option value="medium">Medium (Jan 15, 2024)</option>
              <option value="long">Long (January 15, 2024)</option>
              <option value="full">Full (Monday, January 15, 2024)</option>
            </select>
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ formatDateResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">timeAgo</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Date/Time</label>
            <input
              v-model="timeAgoInput"
              type="datetime-local"
              class="input"
            />
          </div>
          <button @click="updateTimeAgo" class="btn btn-primary w-full">
            Update
          </button>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ timeAgoResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">isValidDate</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Date string to validate</label>
            <input
              v-model="isValidDateInput"
              type="text"
              placeholder="e.g., 2024-01-15, invalid, 1234567890"
              class="input"
            />
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Is valid:</p>
            <code class="text-lg font-mono" :class="isValidDateResult ? 'text-green-600' : 'text-red-600'">
              {{ isValidDateResult ? '✓ Valid' : '✗ Invalid' }}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, timeAgo, isValidDate } from '@progestionsoft/axiom';

const formatDateInput = ref(new Date().toISOString().split('T')[0]);
const formatStyle = ref('short');
const timeAgoInput = ref(new Date().toISOString().slice(0, 16));
const timeAgoResult = ref('');
const isValidDateInput = ref('2024-01-15');

const formatStyleMap: Record<string, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: 'short' },
  medium: { dateStyle: 'medium' },
  long: { dateStyle: 'long' },
  full: { dateStyle: 'full' },
};

const formatDateResult = computed(() => {
  try {
    return formatDate(new Date(formatDateInput.value), formatStyleMap[formatStyle.value]);
  } catch {
    return 'Invalid date';
  }
});

const isValidDateResult = computed(() => isValidDate(isValidDateInput.value));

const updateTimeAgo = () => {
  try {
    timeAgoResult.value = timeAgo(new Date(timeAgoInput.value));
  } catch {
    timeAgoResult.value = 'Invalid date';
  }
};

onMounted(() => {
  updateTimeAgo();
});
</script>
