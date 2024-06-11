<template>
	<!-- <alert-window :setActive="alertIsActive" :sendInfo="setInfo" :data="data" /> -->
	<div class="overflow-auto overflow-y-scroll">
		<table class="w-full border border-black border-collapse">
			<tr>
				<th v-for="prop in propsTable" :key="prop" class="border border-black">
					<span>{{ prop }}</span>
				</th>
				<th v-if="type !== 'debitBalance'">Acciones</th>
			</tr>
			<row-content
				v-for="item in content"
				:content="item"
				:type="type"
				:key="item.id" />
		</table>
	</div>
</template>

<script>
import { computed, reactive, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useCustomerStore } from '@/store'

import AlertWindow from './alert-window.component.vue'
import RowContent from './row-content.component.vue'

export default {
	components: {
		AlertWindow,
		RowContent,
	},
	props: {
		filters: Array,
		type: String,
	},

	setup(props) {
		const propsTable = ref({})

		switch (props.type) {
			case 'customer':
				propsTable.value = {
					name: 'Nombre',
					phone: 'Telefono',
					address: 'Dirección',
				}
				break
			case 'sale':
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
					in: 'Entradas',
					out: 'Salidas',
					stock: 'Existencias',
					unitPrice: 'Precio unitario',
				}
				break
			case 'history':
				propsTable.value = {
					id: 'Folio',
					isCustomer: 'Cliente registrado',
					name: 'Nombre del cliente',
					total: 'Importe',
				}
				break
			case 'account':
				propsTable.value = {
					id: 'Folio',
					movement: 'Tipo de movimiento',
					date: 'Fecha',
					subtotal: 'Subtotal',
					discount: 'Descuento',
					total: 'Importe',
				}
				break
			case 'debitBalance':
				propsTable.value = {
					name: 'Nombre',
					RFC: 'RFC',
					total: 'Saldo',
				}
				break
			case 'return':
				propsTable.value = {
					ISBN: 'ISBN',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
		}

		const idSelected = ref('')
		const data = {
			message: 'Agregar material',
			label: 'Agregar',
			discount: true,
		}
		const alertIsActive = ref(false)
		const toogleAlert = (id) => {
			alertIsActive.value = !alertIsActive.value
			idSelected.value = id
			return alertIsActive.value
		}
		const setInfo = (data) => {
			if (data) {
				const stock = store.getters.stock(idSelected.value)
				stock.in += data.discount
				stock.stock += data.discount
				// ipcRenderer.send(
				// 	'update-stock',
				// 	{ id: idSelected.value },
				// 	JSON.parse(JSON.stringify(stock))
				// )
			}
			toogleAlert()
		}

		const customerStore = useCustomerStore()

		const content = computed(() => customerStore.getCustomers)

		// const content = computed(() => {
		// 	if (props.typeTable === 'account') {
		// 		if (props.filters.length <= 0) return []
		// 		const data = store.getters.account(props.filters[0].id)
		// 		return data.movements
		// 	} else if (props.typeTable === 'debitBalance') {
		// 		const data = store.getters.debitBalance(props.filters[0]?.id)
		// 		return data
		// 	} else if (props.filters) {
		// 		if (props.filters.length > 0) {
		// 			const data = store.getters[`${props.typeTable}s`]
		// 			return data.filter((dataElement) => {
		// 				for (let index = 0; index < props.filters.length; index++) {
		// 					if (
		// 						dataElement[props.filters[index].prop] ===
		// 						props.filters[index].value
		// 					)
		// 						return true
		// 				}
		// 				return false
		// 			})
		// 		} else return store.getters[`${props.typeTable}s`]
		// 	} else return store.getters[`${props.typeTable}s`]
		// })

		const dataEdit = ref({})
		const editingId = ref('')
		const editing = ref(false)

		watch(
			() => dataEdit.value.number,
			() => {
				dataEdit.value.number = Number(dataEdit.value.number)
				dataEdit.value.amount =
					Number(dataEdit.value.number) *
					(Number(dataEdit.value.unitPrice) -
						Number(dataEdit.value.unitPrice) *
							(Number(dataEdit.value.discount) / 100))
			}
		)
		watch(
			() => dataEdit.value.unitPrice,
			() => {
				dataEdit.value.unitPrice = Number(dataEdit.value.unitPrice)
				dataEdit.value.amount =
					Number(dataEdit.value.number) *
					(Number(dataEdit.value.unitPrice) -
						Number(dataEdit.value.unitPrice) *
							(Number(dataEdit.value.discount) / 100))
			}
		)
		watch(
			() => dataEdit.value.discount,
			() => {
				dataEdit.value.discount = Number(dataEdit.value.discount)
				dataEdit.value.amount =
					Number(dataEdit.value.number) *
					(Number(dataEdit.value.unitPrice) -
						Number(dataEdit.value.unitPrice) *
							(Number(dataEdit.value.discount) / 100))
			}
		)

		const toogleEditing = (id) => {
			if (editingId.value === id) {
				editing.value = !editing.value
				editingId.value = ''
			} else if (editingId.value === '') {
				editing.value = !editing.value
				editingId.value = id
			} else editingId.value = id
		}

		// const editRow = (id) => {
		// 	dataEdit.value = JSON.parse(
		// 		JSON.stringify(store.getters[`${props.typeTable}`](id))
		// 	)

		// 	toogleEditing(id)
		// }

		// const editRowCorrect = (id) => {
		// 	if (props.typeTable === 'sale' || props.typeTable === 'return')
		// 		store.dispatch(
		// 			ActionTypes[
		// 				`update${
		// 					props.typeTable.charAt(0).toUpperCase() + props.typeTable.slice(1)
		// 				}`
		// 			],
		// 			dataEdit.value
		// 		)
		// 	// else if (props.typeTable === 'account')
		// 		// ipcRenderer.send(
		// 		// 	`update-${props.typeTable}`,
		// 		// 	{ id: props.filters[0].id },
		// 		// 	JSON.parse(JSON.stringify(dataEdit.value))
		// 		// )
		// 	// else
		// 		// ipcRenderer.send(
		// 		// 	`update-${props.typeTable}`,
		// 		// 	{ id },
		// 		// 	JSON.parse(JSON.stringify(dataEdit.value))
		// 		// )

		// 	toogleEditing(id)
		// }

		// const deleteRow = (id) => {
		// 	if (props.typeTable === 'sale' || props.typeTable === 'return') {
		// 		store.dispatch(
		// 			ActionTypes[
		// 				`delete${
		// 					props.typeTable.charAt(0).toUpperCase() + props.typeTable.slice(1)
		// 				}`
		// 			],
		// 			id
		// 		)
		// 	}
		//   // else ipcRenderer.send(`delete-${props.typeTable}`, { id })
		// }

		const setDate = (date) => {
			const months = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre',
			]
			const dateF = new Date(date)
			return `${('0' + dateF.getDate()).slice(-2)}/${
				months[dateF.getMonth()]
			}/${dateF.getFullYear()}
			${dateF.getHours()}:${dateF.getMinutes()}:${dateF.getSeconds()}`
		}

		return {
			content,
			editingId,
			editing,
			dataEdit,
			toogleEditing,
			editRow: {},
			editRowCorrect: {},
			deleteRow: {},
			propsTable,
			setDate,
			alertIsActive,
			data: {},
			toogleAlert,
			setInfo,
		}
	},
}
</script>
