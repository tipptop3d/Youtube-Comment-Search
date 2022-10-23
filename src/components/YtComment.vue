<template>
  <div class="ycs-comment">
    <div class="ycs-author-thumbnail">
      <a :href="'/channel/' + authorId"></a>
      <img :src="authorThumbnail" />
    </div>
  </div>
  <div class="ycs-content">
    <div class="ycs-header">
      <div class="ycs-user-name"> {{ userName }} </div>
      <div class="ycs-time-stamp"> {{ timeAgo }} </div>
    </div>
    <div class="ycs-comment-content"> {{ content }} </div>
    <div class="ycs-like-count">
      <YtLikeIcon />
      {{ likeCount }}
    </div>
  </div>
</template>

<script setup>
import YtLikeIcon from './yt-icons/YtLikeIcon.vue'

import { ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/advancedFormat'
dayjs.extend(relativeTime)

const props = defineProps({
  data: {
    userName: String,
    authorId: String,
    authorThumbnail: String,
    content: String,
    likeCount: Number,
    timeStamp: Date
  }
})

const { userName, authorId, authorThumbnail, content, likeCount, timeStamp } = props.data

const timeAgo = computed(() => {
  return dayjs(timeStamp).fromNow()
})

</script>


<style scoped>

</style>
