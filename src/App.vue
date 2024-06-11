<template>
	<router-view />
	<side-navigator-bar :getActive="true" />
</template>

<script setup lang="ts">
import { SideNavigatorBar } from '@common/components'
import { useCustomerStore } from '@/store'

const customerStore = useCustomerStore()

customerStore.syncCustomers()
</script>

<style scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
