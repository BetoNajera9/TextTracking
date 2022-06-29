<template>
	<router-view :setActive="isActive" />
	<side-navigator-bar :getActive="getActiveBar" />
</template>

<script>
import SideNavigatorBar from './components/SideNavigatorBar.vue'
import { mapActions } from 'vuex'

export default {
	name: 'App',
	components: {
		SideNavigatorBar,
	},

	beforeMount() {
		this['customer/setCustomers']()
	},

	data: () => ({
		isActive: false,
	}),

	methods: {
		...mapActions(['customer/setCustomers']),
		getActiveBar() {
			this.isActive = !this.isActive
		},
	},

	setup() {},
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
