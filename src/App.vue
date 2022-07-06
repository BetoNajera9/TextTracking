<template>
	<router-view :setActive="isActive" />
	<side-navigator-bar :getActive="getActiveBar" />
</template>

<script>
import SideNavigatorBar from './components/SideNavigatorBar.vue'
import { useStore } from './store'
import { onBeforeMount, ref } from 'vue'

export default {
	name: 'App',
	components: {
		SideNavigatorBar,
	},

	setup() {
		const store = useStore()

		const isActive = ref(false)

		const getActiveBar = () => {
			isActive.value = !isActive.value
		}

		onBeforeMount(() => {
			store.dispatch('setCustomers')
			store.dispatch('setAllStock')
			store.dispatch('setHistory')
			store.dispatch('setAccountStatements')
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
