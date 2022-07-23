<template>
	<alert-window :setActive="alertIsActive" :sendInfo="setInfo" :data="data" />
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
					<span v-if="data[prop] === true">
						<mdicon class="ok" name="check" />
					</span>
					<span v-else-if="data[prop] === false">
						<mdicon class="cancel" name="close" />
					</span>
					<span v-else-if="prop === 'date'">
						{{ setDate(data[prop]) }}
					</span>
					<span v-else-if="prop === 'id'">
						{{ data[prop] }}
					</span>
					<span v-else-if="editingId !== data.id">
						<span
							v-if="
								prop === 'unitPrice' || prop === 'amount' || prop === 'total'
							"
						>
							${{
								data[prop]
									? data[prop]
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '-'
							}}
						</span>

						<span v-else-if="prop === 'discount'">
							{{
								data[prop]
									? data[prop]
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '0'
							}}
							%
						</span>

						<span v-else="prop === 'discount'"> {{ data[prop] }}</span>
					</span>
					<input
						v-else
						type="text"
						v-model="dataEdit[prop]"
						:disabled="prop === 'amount' || data.total > 0 ? true : false"
					/>
				</td>
				<td>
					<mdicon
						v-show="typeTable === 'stock'"
						class="iconTable plus"
						name="plus"
						@click="toogleAlert(data.id)"
					/>
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
import { computed, watch, ref } from 'vue'
import { ipcRenderer } from 'electron'

import alertWindow from './alertWIndow.vue'
import { ActionTypes } from '../store/actions'
import { useStore } from '../store'

export default {
	components: {
		alertWindow,
	},
	props: {
		typeTable: String,
		filters: Array,
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
					date: 'Fecha',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					total: 'Importe',
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
				ipcRenderer.send(
					'update-stock',
					{ id: idSelected.value },
					JSON.parse(JSON.stringify(stock))
				)
			}
			toogleAlert()
		}

		const store = useStore()

		const content = computed(() => {
			if (props.typeTable === 'account') {
				if (props.filters.length <= 0) return []
				const data = store.getters.account(props.filters[0].id)
				return data.movements
			} else if (props.filters) {
				if (props.filters.length > 0) {
					const data = store.getters[`${props.typeTable}s`]
					return data.filter((dataElement) => {
						for (let index = 0; index < props.filters.length; index++) {
							if (
								dataElement[props.filters[index].prop] ===
								props.filters[index].value
							)
								return true
						}
						return false
					})
				} else return store.getters[`${props.typeTable}s`]
			} else return store.getters[`${props.typeTable}s`]
		})

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

		const editRow = (id) => {
			if (props.typeTable === 'account') {
				dataEdit.value = JSON.parse(
					JSON.stringify(store.getters.accountMovement(props.filters[0].id, id))
				)
			} else
				dataEdit.value = JSON.parse(
					JSON.stringify(store.getters[`${props.typeTable}`](id))
				)

			toogleEditing(id)
		}

		const editRowCorrect = (id) => {
			if (props.typeTable === 'sale')
				store.dispatch(ActionTypes.updateSale, dataEdit.value)
			else if (props.typeTable === 'account')
				ipcRenderer.send(
					`update-${props.typeTable}`,
					{ id: props.filters[0].id },
					JSON.parse(JSON.stringify(dataEdit.value))
				)
			else
				ipcRenderer.send(
					`update-${props.typeTable}`,
					{ id },
					JSON.parse(JSON.stringify(dataEdit.value))
				)

			toogleEditing(id)
		}

		const deleteRow = (id) => {
			if (props.typeTable === 'sale') store.dispatch(ActionTypes.deleteSale, id)
			else ipcRenderer.send(`delete-${props.typeTable}`, { id })
		}

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
			editRow,
			editRowCorrect,
			deleteRow,
			propsTable,
			setDate,
			alertIsActive,
			data,
			toogleAlert,
			setInfo,
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

.iconTable.plus {
	color: rgba(0, 146, 0, 0.5);
}
</style>
