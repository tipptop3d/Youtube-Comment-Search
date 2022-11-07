<template>
	<div>
		<input v-model="debug" type="checkbox" id="debug" />
		<label for="debug">Debug?</label>
		<input v-model="searchQuery" type="search" placeholder="Search..." />
		<button @click="handleSubmit"></button>
	</div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

var debug = true
const videoIdExp = RegExp(/youtu(?:.*\/v\/|.*v=|\.be\/)([A-Za-z0-9_-]{11})/);
const videoId = window.location.href.match(videoIdExp)[1]
const searchQuery = ref('')
const { _, updateThreads } = inject('filteredThreads')

const domain = computed(() => {
	return (debug ? 'http://localhost:8080' : 'https://ytc-backend.onrender.com') + '/comments?'
})

async function getData() {
	const response = await fetch(domain.value + new URLSearchParams({
		videoId: videoId,
		filter: searchQuery.value
	}))
	const data = await response.json()
	if (response.ok) {
		return Promise.resolve(data)
	} else {
		return Promise.reject(data)
	}
}

function handleSubmit() {
	getData()
		.then(data => {
			const commentThreads = data.items
			updateThreads(commentThreads)
		})
		.catch(error => {
			console.error(error)
		})
}


</script>


<style scoped>
input[type="search"] {
	outline: none;
	height: 24px;
	color: var(--ytd-searchbox-text-color);
	background-color: var(--ytd-searchbox-background);
	border: 1px solid var(--ytd-searchbox-legacy-border-color);
}
</style>