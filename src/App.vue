<template>
	<router-view :setActive="isActive" />
	<side-navigator-bar :getActive="getActiveBar" />
</template>

<script>
import SideNavigatorBar from './components/SideNavigatorBar.vue'

export default {
	name: 'App',

	components: {
		SideNavigatorBar,
	},

	data: () => ({
		isActive: false,
	}),

	methods: {
		getActiveBar(isActive) {
			this.isActive = isActive
		},
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
