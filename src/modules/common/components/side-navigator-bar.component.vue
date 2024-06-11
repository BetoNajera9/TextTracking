<template>
	<div
		:class="{ 'w-52': sideBar, 'w-12': !sideBar }"
		class="fixed top-0 left-0 h-screen py-1.5 shadow-lg transition-all duration-300 ease-in">
		<div class="flex justify-center items-center">
			<div
				:class="{ block: sideBar, hidden: !sideBar }"
				class="text-black flex h-12 w-full items-center pointer-events-none transition-all duration-300 ease-in pl-4">
				<div class="text-lg font-semibold transition-all duration-300 ease-in">
					TextTrack
				</div>
			</div>
			<mdicon
				name="menu"
				@click="toogleBar"
				class="flex justify-center items-center h-12 w-12 cursor-pointer" />
		</div>
		<ul class="mt-5 p-0">
			<list-item
				link="/"
				icon-name="home"
				link-name="Inicio"
				:side-bar="sideBar" />

			<list-item
				link="/customer"
				icon-name="account"
				link-name="Clientes"
				:side-bar="sideBar" />

			<list-item
				link="/sales"
				icon-name="cart"
				link-name="Ventas"
				:side-bar="sideBar" />

			<list-item
				link="/storage"
				icon-name="store"
				link-name="Almacen"
				:side-bar="sideBar" />

			<list-item
				link="/history"
				icon-name="history"
				link-name="Historial"
				:side-bar="sideBar" />

			<list-item
				link="/account-states"
				icon-name="file-account"
				link-name="Estados de cuenta"
				:side-bar="sideBar" />

			<list-item
				link="/returns"
				icon-name="cash-refund"
				link-name="Devoluciones"
				:side-bar="sideBar" />

			<list-item
				link="/pending-payments"
				icon-name="list-status"
				link-name="Saldo deudor"
				:side-bar="sideBar" />
		</ul>
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'


import ListItem from './list-item.component.vue'

import { useAppStore } from '@/store'

export default {
	components: {
		ListItem,
	},

	setup() {
		const appStore = useAppStore()

		const { sideBar } = storeToRefs(appStore)

		const toogleBar = () => {
			appStore.toogleBar()
		}

		return {
			toogleBar,
			sideBar,
		}
	},
}
</script>