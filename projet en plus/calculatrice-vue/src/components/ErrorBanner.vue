<template>
  <div v-if="errorMsg && errorMsg.length" class="error-msg card" aria-live="assertive" aria-atomic="true">
    {{ errorMsg }}
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCalculatorStore } from '../store/calculator';
const store = useCalculatorStore();
const { errorMsg } = storeToRefs(store);
</script>
<style scoped>
.error-msg {
  color: var(--color-error);
  background: rgba(255,77,79,0.15);
  border: 1px solid var(--color-error);
  border-radius: 10px;
  padding: 0.7em 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  text-align: center;
  min-height: 2em;
  box-shadow: 0 2px 16px #ff0033aa;
  display: block !important;
  opacity: 1 !important;
  position: static;
  z-index: 9999;
  pointer-events: none;
}
</style> 