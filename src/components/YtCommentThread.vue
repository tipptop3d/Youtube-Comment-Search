<template>
  <div class="ycs-comment">
    <div class="ycs-author-thumbnail">
      <a :href="'/channel/' + topLvlComment.authorChannelId">
        <img class="ycs-author-image" :src="topLvlComment.authorProfileImageUrl" />
      </a>
    </div>
    <div class="ycs-main">
      <div class="ycs-header">
        <a class="ycs-author-name" :href="'/channel/' + topLvlComment.authorChannelId">
          {{ topLvlComment.authorDisplayName }}
        </a>
        <a class="ycs-timestamp" :href="`?v=${videoId}&lc=${topLvlCommentId}`">
          {{ timeAgo }} (edited {{ updatedAt }})
        </a>
      </div>
      <div class="ycs-comment-content" ref="contentElement">
      </div>
      <div class="ycs-toolbar">
        <div class="ycs-icon-container">
          <div class="ycs-icon">
            <YtLikeIcon />
          </div>
        </div>
        <span class="ycs-like-count"> {{ topLvlComment.likeCount }} </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/de'

import YtLikeIcon from './yt-icons/YtLikeIcon.vue'
dayjs.extend(relativeTime)

const props = defineProps({
  data: {}
})

const contentElement = ref()

const videoId = props.data.snippet.videoId
const topLvlCommentId = props.data.snippet.topLevelComment.id
const topLvlComment = props.data.snippet.topLevelComment.snippet
const timeAgo = dayjs(topLvlComment.publishedAt).fromNow()

const hmsToSeconds = ({ h, m, s }) => {
  return +(h ?? 0) * 3600 + +(m ?? 0) * 60 + +(s ?? 0)
}

const timeRegExp = /t=(?:(?<h>\d+)h)?(?:(?<m>\d+)m)?(?:(?<s>\d+)s)?/
const textElement = document.createElement('div')
textElement.innerHTML = topLvlComment.textDisplay
textElement.querySelectorAll('a').forEach(node => {
  node.classList.add('yt-simple-endpoint', 'style-scope', 'yt-formatted-string')
  let match = node.href.match(timeRegExp)
  if (node.href.includes(`v=${videoId}`) && match) {
    node.setAttribute('data-time', hmsToSeconds(match.groups))
    node.addEventListener('click', event => {
      const player = document.querySelector('#movie_player > div.html5-video-container > video')
      player.currentTime = +event.currentTarget.dataset.time
      event.preventDefault()
    })
  }
})

onMounted(() => {
  contentElement.value.append(textElement)
})

</script>



<style scoped>
.ycs-comment {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: var(--ytd-comment-thread-margin-bottom, 16px);
}

.ycs-comment-content,
.ycs-author-name {
  color: var(--yt-spec-text-primary);
}

.ycs-author-thumbnail {
  display: inline-block;
}

.ycs-author-image {
  height: 40px;
  width: 40px;
  margin-right: 16px;
  overflow: hidden;
  background-color: transparent;
  border-radius: 50%;
}

.ycs-header {
  align-items: baseline;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
}

.ycs-author-name {
  margin-right: 4px;
  margin-bottom: 2px;
  display: block;
  font-size: 1.3rem;
  line-height: 1.8rem;
  white-space: nowrap;
  font-weight: 500;
  text-decoration: none;
}

.ycs-comment-content {
  font-size: 1.4rem;
  line-height: 2rem;
  overflow-wrap: anywhere;
}

.ycs-timestamp {
  color: var(--yt-spec-text-secondary);
  font-size: 1.2rem;
  line-height: 1.8rem;
  text-decoration: none;
}

.ycs-timestamp:visited {
  color: var(--yt-spec-text-secondary);
  text-decoration: none;
}

.ycs-toolbar {
  margin-top: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.ycs-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  flex: none;
  width: 32px;
  height: 32px;
  margin-left: -8;
}

.ycs-icon {
  width: 24px;
  height: 24px;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 0px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  vertical-align: middle;
  color: var(--yt-spec-text-primary);
  fill: var(--iron-icon-fill-color, currentcolor);
  stroke: var(--iron-icon-stroke-color, none);
}

.ycs-like-count {
  color: var(--yt-spec-text-secondary);
  display: inline-block;
  margin-right: 8px;
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
}
</style>
