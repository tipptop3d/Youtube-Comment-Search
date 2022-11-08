<template>
  <div class="filter-container" v-if="filteredThreads.length > 0">
    <YtComment v-for="thread in filteredThreads" :data="thread"></YtComment>
    <button class="close" @click="onClose">X</button>
  </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import YtComment from './YtCommentThread.vue'

const { filteredThreads, updateThreads} = inject('filteredThreads')

function onClose() {
  updateThreads([])
}

const contents = document.body.querySelector('#comments>#sections>#contents')

watch(filteredThreads, (newValue) => {
  console.log(newValue)
  if (newValue.length == 0) {
    contents.style.display = 'block'
  } else {
    contents.style.display = 'none'
  }
})
</script>

<style scoped>
.filter-container {
  position: relative;
}
.close {
  position: absolute;
  right: 20px;
  top: -20px;
  height: 40px;
  width: 40px;
  color: var(--yt-spec-text-primary);
  background-color: var(--yt-spec-general-background-a);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.1s;
}
.close:hover {
  background-color: var(--yt-spec-static-overlay-button-secondary);
}

</style>
