<template>
	<div>
		<input v-model="debug" type="checkbox" id="debug"/>
		<label for="debug">Debug?</label>
		<input v-model="searchQuery" type="search" placeholder="Search..." />
		<button @click="handleSubmit"></button>
	</div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue'

var debug = true
const videoIdExp = RegExp(/youtu(?:.*\/v\/|.*v=|\.be\/)([A-Za-z0-9_-]{11})/);
const videoId = window.location.href.match(videoIdExp)[1]
const searchQuery = ref('')

const domain = computed(() => {
	return (debug ? 'http://localhost:8080' : 'https://ytc-backend.onrender.com') + '/comments?'
})

async function getData() {
	return await fetch(domain.value + new URLSearchParams({
		videoId: videoId,
		filter: searchQuery.value
	}))
}

async function handleSubmit() {
	const data = await getData()
	console.log(await data.json())
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
<!--
	#container.ytd-searchbox {
	position: relative;
	align-items: center;
	background-color: var(--ytd-searchbox-background);
	border: 1px solid var(--ytd-searchbox-legacy-border-color);
	border-right: none;
	border-radius: 2px 0 0 2px;
	box-shadow: inset 0 1px 2px var(--ytd-searchbox-legacy-border-shadow-color);
	color: var(--ytd-searchbox-text-color);
	padding: 2px 6px;
	margin-left: 34px;
	flex: 1;
	flex-basis: 0.000000001px;
	display: flex;
	flex-direction: row;
} -->