<template>
	<alert-window />
	<div :class="{ content: 'content', active: isActive }">
		<h1>Saldo deudor</h1>
		<div class="wap-search">
			<label class="formkit-label">Cliente</label>
			<search-bar
				:dataType="'customers'"
				:propSearch="'name'"
				:setData="getDataByName"
			/>
		</div>
		<div class="filter-wrap">
			<div class="filter-list" v-for="filter in filters" :key="filter.id">
				<span class="filter">{{ filter.name }}</span>
				<mdicon
					class="close-filter"
					name="close"
					id="btn-close"
					@click="removeFilter(filter.id)"
				/>
			</div>
		</div>
		<FormKit type="button" label="PDF" @click="createPDF" />
		<table-data :typeTable="'debitBalance'" :filters="filters" />
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { computed, ref } from 'vue'

import AlertWindow from '../components/alertWIndow.vue'
import SearchBar from '../components/SearchBar.vue'
import TableData from '../components/TableData.vue'
import { useStore } from '../store'

export default {
	components: {
		AlertWindow,
		TableData,
		SearchBar,
	},

	setup() {
		const store = useStore()
		const isActive = computed(() => store.getters.isActive)
		let filters = ref([])

		const getDataByName = (data) => {
			filters.value.push(data)
		}

		const removeFilter = (filter) => {
			filters.value = filters.value.filter((element) =>
				element.id === filter ? false : true
			)
		}

		const createPDF = () => {
			const data = store.getters.debitBalance(filters.value[0]?.id)

			ipcRenderer.send('save-debit-balance-pdf', data)
		}

		return {
			getDataByName,
			removeFilter,
			createPDF,
			isActive,
			filters,
		}
	},
}
</script>

<style scoped>
.content {
	position: absolute;
	padding: 10px;
	width: calc(100% - 100px);
	left: 78px;
	transition: all 0.5s ease;
}

.content.active {
	width: calc(100% - 260px);
	left: 240px;
}

.wap-search {
	margin-bottom: 10px;
}
</style>
