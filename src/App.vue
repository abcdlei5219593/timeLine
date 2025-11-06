<template>
  <AiChat />
</template>

<script setup lang="ts">
import AiChat from './components/AiChat.vue'
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Highlight.js 样式覆盖 */
.hljs {
  padding: 1rem !important;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
