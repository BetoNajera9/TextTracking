<template>
	<router-view :setActive="isActive" />
	<side-navigator-bar :getActive="getActiveBar" />
</template>

<script>
import SideNavigatorBar from './components/SideNavigatorBar.vue'
import { onBeforeMount, ref } from 'vue'
import { ipcRenderer } from 'electron'

export default {
	name: 'App',
	components: {
		SideNavigatorBar,
	},

	setup() {
		const isActive = ref(false)

		const getActiveBar = () => {
			isActive.value = !isActive.value
		}

		onBeforeMount(() => {
			ipcRenderer.send('get-and-set-customers')
			ipcRenderer.send('get-and-set-stock')
			ipcRenderer.send('get-sale-set-history')
			ipcRenderer.send('get-and-set-account-statements')
		})

		return {
			getActiveBar,
			isActive,
		}
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
