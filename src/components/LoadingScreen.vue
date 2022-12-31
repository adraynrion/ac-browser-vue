<template>
  <div class="blink">
    <MainTopbarVue largest-width />
  </div>
</template>

<script setup>
import MainTopbarVue from '@/components/MainTopbar.vue'
</script>

<style lang="scss" scoped>
.blink {
  animation: pulse 4s infinite;
  -webkit-animation: pulse 4s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  65% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes pulse {
  0% {
    opacity: 0;
  }
  65% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
