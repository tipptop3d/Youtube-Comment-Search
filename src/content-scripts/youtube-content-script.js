import { createApp } from 'vue'


import FilterQueryInput from '../components/FilterQueryInput.vue'
import YtCommentSection from '../components/FilterQueryInput.vue'

import { waitForElm } from '../helpers'

var filteredComments

const commentFilter = document.createElement('div')
commentFilter.setAttribute('id', 'comment-filter')
commentFilter.classList.add('ytd-comments-header-renderer')

waitForElm('div#title.ytd-comments-header-renderer').then((elm) => {
	elm.appendChild(commentFilter)
	const app = createApp(FilterQueryInput)
	app.mount(commentFilter)
	app.provide('filteredComments', filteredComments)
})

const filteredSection = document.createElement('div')
filteredSection.setAttribute('id', 'filtered-section')
filteredSection.classList.add('ytd-item-section-renderer')

waitForElm('#comments>#sections>#contents').then((elm) => {
	elm.after(filteredSection)
	const app = createApp(YtCommentSection)
	app.mount(filteredSection)
	app.provide('filteredComments', filteredComments)
})