import { createApp, ref } from 'vue'

import FilterQueryInput from '../components/FilterQueryInput.vue'
import FilteredCommentSection from '../components/FilteredCommentSection.vue'

import { waitForElm } from '../helpers'

const videoIdExp = RegExp(/youtu(?:.*\/v\/|.*v=|\.be\/)([A-Za-z0-9_-]{11})/);

function injectApps() {
	const filteredThreads = ref([])

	function updateThreads(newThreads) {
		filteredThreads.value = newThreads
	}

	const commentFilter = document.createElement('div')
	commentFilter.setAttribute('id', 'comment-filter')
	commentFilter.classList.add('ytd-comments-header-renderer')

	waitForElm('div#title.ytd-comments-header-renderer').then((elm) => {
		elm.appendChild(commentFilter)
		const queryApp = createApp(FilterQueryInput)
		queryApp.provide('filteredThreads', { filteredThreads, updateThreads })
		queryApp.mount(commentFilter)
	})

	const filteredSection = document.createElement('div')
	filteredSection.setAttribute('id', 'filtered-section')
	filteredSection.classList.add('ytd-item-section-renderer')

	waitForElm('#comments>#sections>#contents').then((elm) => {
		elm.after(filteredSection)
		const sectionApp = createApp(FilteredCommentSection)
		sectionApp.provide('filteredThreads', { filteredThreads, updateThreads })
		sectionApp.mount(filteredSection)
	})
}

if (window.location.href.match(videoIdExp)) {
	injectApps()
}
var oldHref = window.location.href

window.addEventListener('yt-navigate-start', event => {
	updateThreads([])
	if (!oldHref.match(videoIdExp) && window.location.href.match(videoIdExp)) {
		injectApps()
	}
}, true)