<template>
 <YtComment v-for="comment in props.comments"></YtComment>
</template>

<script setup>
import YtComment from './YtComment.vue'

const props = defineProps({
  comments: Array({
    userName: String,
    authorId: String,
    authorThumbnail: String,
    content: String,
    likeCount: Number,
    timeStamp: Date
  })
})
</script>

<style scoped>

</style>
