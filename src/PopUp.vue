<template>
	<div>
		<input v-model="url" placeholder="URL..." />
		<input v-model="searchQuery" placeholder="Search..." />
		<button @click="handleSearch"></button>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const ytIdFilter = RegExp(/youtu(?:.*\/v\/|.*v=|\.be\/)([A-Za-z0-9_-]{11})/);

const url = ref('')
const searchQuery = ref('')

function handleSearch() {
	const videoId = url.value.match(ytIdFilter)[1]
	fetch('localhost:8080' + URLSearchParams({
		videoId: videoId,
		filter: searchQuery.value
	}))
}
</script>


<style scoped>

</style>
