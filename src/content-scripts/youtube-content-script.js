import { createApp, ref } from 'vue'

import FilterQueryInput from '../components/FilterQueryInput.vue'
import FilteredCommentSection from '../components/FilteredCommentSection.vue'

import { waitForElm } from '../helpers'

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
	queryApp.provide('filteredThreads', {filteredThreads, updateThreads})
	queryApp.mount(commentFilter)
})

const filteredSection = document.createElement('div')
filteredSection.setAttribute('id', 'filtered-section')
filteredSection.classList.add('ytd-item-section-renderer')

waitForElm('#comments>#sections>#contents').then((elm) => {
	elm.after(filteredSection)
	const sectionApp = createApp(FilteredCommentSection)
	sectionApp.provide('filteredThreads', {filteredThreads, updateThreads})
	sectionApp.mount(filteredSection)
})