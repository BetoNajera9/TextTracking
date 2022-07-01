<template>
	<div class="table">
		<table class="data-table">
			<tr>
				<th v-for="prop in propsTable" :key="prop">
					<span>{{ prop }}</span>
				</th>
				<th>Acciones</th>
			</tr>
			<tr v-for="data in customers" :key="data.id">
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
import { mapGetters, mapActions } from 'vuex'

export default {
	data: () => ({
		dataEdit: {},
		propsTable: {},
		editingId: '',
		editing: false,
	}),

	methods: {
		...mapActions(['customer/updateCustomer', 'customer/deleteCustomer']),
		toogleEditing(id) {
			if (this.editingId === id) {
				this.editing = !this.editing
				this.editingId = ''
			} else if (this.editingId === '') {
				this.editing = !this.editing
				this.editingId = id
			} else this.editingId = id
		},
		editRow(id) {
			this.dataEdit = JSON.parse(JSON.stringify(this.customer(id)))

			this.toogleEditing(id)
		},
		async editRowCorrect(id) {
			await this['customer/updateCustomer'](this.dataEdit)

			this.toogleEditing(id)
		},
		async deleteRow(id) {
			await this['customer/deleteCustomer'](id)
		},
	},

	computed: {
		...mapGetters({
			customers: 'customer/customers',
			customer: 'customer/customer',
		}),
	},

	created() {
		switch (this.typeTable) {
			case 'customer':
				this.propsTable = {
					name: 'Nombre',
					phone: 'Telefono',
					RFC: 'RFC',
					WayToPay: 'Forma de pago',
					CFDI: 'CFDI',
				}
				break
			case 'sales':
				this.propsTable = {
					ISBN: 'ISBN',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
			case 'stock':
				this.propsTable = {
					ISBN: 'ISBN',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					amount: 'Importe',
				}
				break
			case 'history':
				this.propsTable = {
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
				this.propsTable = {
					id: 'Folio',
					description: 'Descripcion',
					number: 'Cantidad',
					unitPrice: 'Precio unitario',
					discount: 'Descuento',
					amount: 'Importe',
				}
				break
		}
	},

	props: {
		typeTable: String,
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
