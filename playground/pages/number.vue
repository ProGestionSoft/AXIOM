<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Number Utilities</h2>
      <p class="text-gray-600">Test number formatting and manipulation functions in real-time</p>
    </div>

    <div class="space-y-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">formatNumber</h3>
        <div class="space-y-3">
          <div>
            <label class="label">Number to format</label>
            <input
              v-model.number="formatValue"
              type="number"
              step="0.01"
              placeholder="Enter number..."
              class="input"
            />
          </div>
          <div>
            <label class="label">Decimal places</label>
            <input
              v-model.number="formatDecimals"
              type="number"
              min="0"
              max="10"
              class="input"
            />
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ formatResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">clamp</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="label">Value</label>
              <input
                v-model.number="clampValue"
                type="number"
                step="0.1"
                class="input"
              />
            </div>
            <div>
              <label class="label">Min</label>
              <input
                v-model.number="clampMin"
                type="number"
                step="0.1"
                class="input"
              />
            </div>
            <div>
              <label class="label">Max</label>
              <input
                v-model.number="clampMax"
                type="number"
                step="0.1"
                class="input"
              />
            </div>
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ clampResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">roundTo</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Number</label>
              <input
                v-model.number="roundValue"
                type="number"
                step="0.001"
                class="input"
              />
            </div>
            <div>
              <label class="label">Decimal places</label>
              <input
                v-model.number="roundDecimals"
                type="number"
                min="0"
                max="10"
                class="input"
              />
            </div>
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ roundResult }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">percent</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="label">Value</label>
              <input
                v-model.number="percentValue"
                type="number"
                step="0.1"
                class="input"
              />
            </div>
            <div>
              <label class="label">Total</label>
              <input
                v-model.number="percentTotal"
                type="number"
                step="0.1"
                class="input"
              />
            </div>
            <div>
              <label class="label">Decimals</label>
              <input
                v-model.number="percentDecimals"
                type="number"
                min="0"
                max="10"
                class="input"
              />
            </div>
          </div>
          <div class="result-box">
            <p class="text-sm text-gray-600 mb-1">Result:</p>
            <code class="text-lg font-mono text-primary-600">{{ percentResult }}%</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumber, clamp, roundTo, percent } from '@progestionsoft/axiom';

const formatValue = ref(1234567.89);
const formatDecimals = ref(2);
const clampValue = ref(10);
const clampMin = ref(0);
const clampMax = ref(5);
const roundValue = ref(3.14159);
const roundDecimals = ref(2);
const percentValue = ref(25);
const percentTotal = ref(100);
const percentDecimals = ref(2);

const formatResult = computed(() => formatNumber(formatValue.value, formatDecimals.value));
const clampResult = computed(() => clamp(clampValue.value, clampMin.value, clampMax.value));
const roundResult = computed(() => roundTo(roundValue.value, roundDecimals.value));
const percentResult = computed(() => percent(percentValue.value, percentTotal.value, percentDecimals.value));
</script>
