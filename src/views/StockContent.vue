<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Almacén</h1>
		<FormKit
			id="addMaterialForm"
			type="form"
			:config="{ validationVisibility: 'submit' }"
			form-class="form"
			actions-class="submit"
			message-class="message"
			submit-label="Agregar"
			@submit="addToStock"
		>
			<FormKit
				id="ISBN"
				type="text"
				label="ISBN"
				v-model="data.ISBN"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="description"
			/>
			<FormKit
				id="description"
				type="text"
				label="Descripción"
				v-model="data.description"
				validation="required"
				:validation-messages="{
					required: 'La descripcion es requerida.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="description"
			/>
			<FormKit
				id="int"
				type="number"
				label="Entradas"
				v-model="data.in"
				validation="required"
				:validation-messages="{
					required: 'La cantidad es requerida.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="description"
			/>
			<FormKit
				id="unitPrice"
				type="number"
				label="Precio unitaio"
				v-model="data.unitPrice"
				validation="required"
				:validation-messages="{
					required: 'El precio unitario es requerido.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="description"
			/>
		</FormKit>

		<div class="form">
			<div class="wrap-search">
				<label class="formkit-label">ISBN</label>
				<search-bar
					:dataType="'stocks'"
					:propSearch="'ISBN'"
					:setData="getDataById"
				/>
			</div>

			<div class="wrap-search">
				<label class="formkit-label">Material</label>
				<search-bar
					:dataType="'stocks'"
					:propSearch="'description'"
					:setData="getDataByName"
				/>
			</div>
		</div>
		<div class="filter-wrap">
			<div class="filter-list" v-for="filter in filters" :key="filter.label">
				<span class="filter">{{ filter.label }}</span>
				<mdicon
					class="close-filter"
					name="close"
					id="btn-close"
					@click="removeFilter(filter.label)"
				/>
			</div>
		</div>
		<div class="wrapp-tools">
			<FormKit type="button" label="PDF" @click="generatePdf" />
		</div>
		<table-data :typeTable="'stock'" :filters="filters" />
	</div>
</template>

<script>
import TableData from '../components/TableData.vue'
import SearchBar from '../components/SearchBar.vue'

import { ipcRenderer } from 'electron'

export default {
	components: {
		TableData,
		SearchBar,
	},
	data: () => ({
		filters: [],
		data: {
			ISBN: '',
			description: '',
			in: 0,
			unitPrice: 0,
		},
	}),
	watch: {
		'data.description'(newDescription) {
			if (newDescription) this.data.description = newDescription.toUpperCase()
		},
		'data.in'(newInt) {
			if (newInt) this.data.in = Number(newInt)
		},
		'data.unitPrice'(newUnitPrice) {
			if (newUnitPrice) this.data.unitPrice = Number(newUnitPrice)
		},
	},
	methods: {
		addToStock: async function () {
			ipcRenderer.send('create-stock', { ...this.data })
			this.$formkit.reset('addMaterialForm')
		},
		getDataById(data) {
			this.filters.push({
				value: data.name,
				prop: 'ISBN',
				label: `ISBN:${data.name}`,
			})
		},
		getDataByName(data) {
			this.filters.push({
				value: data.name,
				prop: 'description',
				label: `Nombre:${data.name}`,
			})
		},
		removeFilter(filter) {
			this.filters = this.filters.filter((element) => {
				if (element.label === filter) return false
				return true
			})
		},
		generatePdf() {
			ipcRenderer.send('save-stock-pdf', JSON.parse(JSON.stringify(this.stock)))
		},
	},
	computed: {
		isActive() {
			return this.$store.getters.isActive
		},
		stock() {
			return this.$store.getters.stocks
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
	margin: 10px;
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

.close-filter {
	cursor: pointer;
}
</style>
