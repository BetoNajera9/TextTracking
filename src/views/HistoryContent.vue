<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Historial</h1>
		<div class="form">
			<div class="wrapp-search">
				<label class="formkit-label">Nombre del cliente</label>
				<search-bar
					:dataType="'historys'"
					:propSearch="'name'"
					:setData="getDataByName"
				/>
			</div>
			<div class="wrapp-search">
				<label class="formkit-label">Folio</label>
				<search-bar
					:dataType="'historys'"
					:propSearch="'id'"
					:setData="getDataById"
				/>
			</div>
		</div>
		<div class="filter-list" v-for="filter in filters" :key="filter.label">
			<span class="filter">{{ filter.label }}</span>
			<mdicon
				class="close-filter"
				name="close"
				id="btn-close"
				@click="removeFilter(filter.label)"
			/>
		</div>
		<table-data :typeTable="'history'" :filters="filters" />
	</div>
</template>

<script>
import TableData from '../components/TableData.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
	components: {
		TableData,
		SearchBar,
	},
	data: () => ({
		isActive: false,
		filters: [],
	}),

	props: {
		setActive: Boolean,
	},
	methods: {
		getDataById(data) {
			this.filters.push({
				value: data.id,
				prop: 'id',
				label: `Folio:${data.id}`,
			})
		},
		getDataByName(data) {
			this.filters.push({
				value: data.name,
				prop: 'name',
				label: `Nombre:${data.name}`,
			})
		},
		removeFilter(filter) {
			this.filters = this.filters.filter((element) => {
				if (element.label === filter) return false
				return true
			})
		},
	},

	watch: {
		setActive: function (isActive) {
			this.isActive = isActive
		},
	},
}
</script>

<style>
.content {
	position: absolute;
	padding: 10px;
	width: calc(100% - 100px);
	left: 78px;
	transition: all 0.5s ease;
}

.content .text {
	font-size: 25px;
	font-weight: 500;
	color: black;
	margin: 12px;
}

.content.active {
	width: calc(100% - 260px);
	left: 240px;
}

.form {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	column-gap: 20px;
}

.formkit-outer + .formkit-outer {
	height: 92px;
	width: 180px;
}

.input {
	border: 1px solid black;
	height: 30px;
	width: 100%;
	border-radius: 6px;
}

.formkit-message.message {
	display: none;
	position: relative;
}

.formkit-actions.submit {
	margin-top: 16px !important;
}

.formkit-outer.name {
	width: 250px;
	border: 0 !important;
}
#name {
	width: 100%;
}

.formkit-outer.CFDI {
	width: 250px;
	border: 0 !important;
}
</style>
