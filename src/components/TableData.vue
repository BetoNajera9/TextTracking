<template>
	<div class="table">
		<table class="data-table">
			<tr>
				<th v-for="prop in propsTable" :key="prop">
					<span>{{ prop }}</span>
				</th>
				<th>Acciones</th>
			</tr>
			<tr v-for="data in content" :key="data.id">
				<td v-for="(value, prop) in propsTable" :key="prop">
					<span v-if="editingId !== data.id">{{ data[prop] }}</span>
					<input v-else type="text" v-model="dataEdit[prop]" />
				</td>
				<td>
					<mdicon
						v-show="editingId !== data.id"
						class="iconTable pencil"
						name="pencil"
						@click="editRow(data.id)"
					/>
					<mdicon
						v-show="editingId !== data.id"
						class="iconTable delete"
						name="delete"
						@click="deleteRow(data.id)"
					/>
					<mdicon
						v-show="editing && editingId === data.id"
						class="iconTable ok"
						name="check"
						@click="editRowCorrect(data.id)"
					/>
					<mdicon
						v-show="editing && editingId === data.id"
						class="iconTable cancel"
						name="close"
						@click="toogleEditing(data.id)"
					/>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { computed, ref } from 'vue'

import { useStore } from '../store'

export default {
	props: {
		typeTable: String,
	},

	setup(props) {
		const propsTable = ref({})
		switch (props.typeTable) {
			case 'customer':
				propsTable.value = {
					name: 'Nombre',
					phone: 'Telefono',
					RFC: 'RFC',
					wayToPay: 'Forma de pago',
					CFDI: 'CFDI',
				}
				break
			case 'sales':
				propsTable.value = {
					ISBN: 'ISBN',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
			case 'stock':
				propsTable.value = {
					ISBN: 'ISBN',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					amount: 'Importe',
				}
				break
			case 'history':
				propsTable.value = {
					id: 'Folio',
					customerName: 'Nombre del cliente',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
			case 'account':
				propsTable.value = {
					id: 'Folio',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
		}

		const store = useStore()
		const typeT =
			props.typeTable.charAt(0).toUpperCase() + props.typeTable.slice(1)

		const content = computed(() => store.getters[`${props.typeTable}s`])

		const dataEdit = ref({})
		const editingId = ref('')
		const editing = ref(false)

		const toogleEditing = (id) => {
			if (editingId.value === id) {
				editing.value = !editing.value
				editingId.value = ''
			} else if (editingId.value === '') {
				editing.value = !editing.value
				editingId.value = id
			} else editingId.value = id
		}

		const editRow = (id) => {
			dataEdit.value = JSON.parse(
				JSON.stringify(store.getters[`${props.typeTable}`](id))
			)

			toogleEditing(id)
		}

		const editRowCorrect = async (id) => {
			await store.dispatch(`update${typeT}`, dataEdit.value)

			toogleEditing(id)
		}

		const deleteRow = async (id) => {
			await store.dispatch(`delete${typeT}`, id)(id)
		}

		return {
			content,
			editingId,
			editing,
			dataEdit,
			toogleEditing,
			editRow,
			editRowCorrect,
			deleteRow,
			propsTable,
		}
	},
}
</script>

<style>
.table {
	overflow: auto;
	overflow-y: scroll;
}

table.data-table {
	width: 100%;
	border: 1px solid black;
	border-collapse: collapse;
	margin-right: 20px;
}

td {
	border: 1px solid black;
	text-align: center;
}

.iconTable {
	padding: 2px 0px;
	margin: 0px 3px;
}
.iconTable :hover {
	cursor: pointer;
	color: black;
}

.iconTable.delete {
	color: rgba(255, 0, 0, 0.5);
}

.iconTable.pencil {
	color: rgba(0, 0, 0, 0.5);
}
</style>
