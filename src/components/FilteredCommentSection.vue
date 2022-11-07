<template>
  <YtComment v-for="thread in filteredThreads" :data="thread"></YtComment>
</template>

<script setup>
import { inject, watch } from 'vue';
import YtComment from './YtCommentThread.vue'

console.log('Section', inject('filteredThreads'))
const { filteredThreads, } = inject('filteredThreads')

const contents = document.body.querySelector('#comments>#sections>#contents')

watch(filteredThreads, (newValue) => {
  if (newValue.length == 0) {
    contents.style.display = 'block'
  } else {
    contents.style.display = 'none'
  }
})
</script>

<style scoped>

</style>
