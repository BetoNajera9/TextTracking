<template>
	<alert-window :setActive="alertIsActive" :sendInfo="setInfo" :data="data" />
	<div :class="{ content: 'content', active: isActive }">
		<h1>Ventas</h1>
		<div class="wrappSale">
			<div class="wrap-collabsible">
				<input
					id="collapsible"
					class="toggle"
					type="checkbox"
					@click="toogleCheck"
					value="user-registered"
					v-bind="{ checked: check }"
				/>
				<label for="collapsible" class="lbl-toggle">Cliente Registrado</label>
				<div class="collapsible-content">
					<div class="content-inner">
						<FormKit name="account" type="group" :disabled="!check">
							<div class="wrap-search">
								<label class="formkit-label">Cliente</label>
								<search-bar
									:dataType="'customers'"
									:propSearch="'name'"
									:setData="getDataByName"
								/>
							</div>
						</FormKit>
					</div>
				</div>
			</div>
			<div class="wrap-collabsible">
				<input
					id="collapsible"
					class="toggle"
					type="checkbox"
					@click="toogleCheck"
					value="user"
					v-bind="{ checked: !check }"
				/>
				<label for="collapsible" class="lbl-toggle">Cliente</label>
				<div class="collapsible-content">
					<div class="content-inner form">
						<FormKit name="account" type="group" :disabled="check">
							<FormKit
								id="name"
								type="text"
								label="Nombre"
								v-model="customerData.name"
								input-class="$reset input"
								inner-class="$reset inner"
								outer-class="name"
							/>

							<FormKit
								id="phone"
								type="tel"
								label="Telefono"
								v-model="customerData.phone"
								validation="matches:/^[0-9]{10}$/"
								:validation-messages="{
									matches: 'El telfono debe de ser minimo 10 numeros.',
								}"
								input-class="$reset input"
								inner-class="$reset inner"
							/>

							<FormKit
								id="RFC"
								type="text"
								label="RFC"
								v-model="customerData.RFC"
								input-class="$reset input"
								inner-class="$reset inner"
							/>

							<FormKit
								id="wayToPay"
								type="select"
								label="Forma de pago"
								v-model="customerData.wayToPay"
								:options="['EFECTO', 'TARJETA DE CREDITO/DEBITO']"
								input-class="$reset input"
								inner-class="$reset inner"
							/>

							<FormKit
								id="CFDI"
								type="text"
								label="Uso de CFDI"
								v-model="customerData.CFDI"
								input-class="$reset input"
								inner-class="$reset inner"
								outer-class="name"
							/>

							<FormKit
								id="address"
								type="text"
								label="Dirección"
								v-model="customerData.address"
								input-class="$reset input"
								inner-class="$reset inner"
								outer-class="name"
							/>
						</FormKit>
					</div>
				</div>
			</div>
			<div class="sale-data form">
				<div class="wrap-search">
					<label class="formkit-label">Material</label>
					<search-bar
						:propSearch="'description'"
						:dataType="'stocks'"
						:setData="getData"
					/>
				</div>
				<FormKit
					id="amount"
					type="number"
					label="Cantidad"
					value="1"
					step="1"
					min="1"
					:max="max"
					v-model="saleData.number"
					validation="required|matches:/^[0-9]+$/"
					:validation-messages="{
						required: 'Ingresar cantidad',
						matches: 'Ingesar cantidad valida',
					}"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
				<FormKit
					id="price"
					type="number"
					label="Precio"
					step="10"
					min="0"
					v-model="saleData.unitPrice"
					validation="required|matches:/^[0-9]+$/"
					:validation-messages="{
						required: 'Ingresar precio del producto',
						matches: 'Ingesar cantidad valida',
					}"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
				<FormKit
					id="discount"
					type="number"
					label="Descuento"
					value="20"
					step="10"
					min="0"
					max="100"
					v-model="saleData.discount"
					validation="required|matches:/^[0-9]+$/"
					:validation-messages="{
						required: 'Ingresar descuento',
						matches: 'Ingesar descuento valida',
					}"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
				<FormKit
					type="button"
					label="Agregar material"
					@click="addMaterial"
					:disabled="max > 0 ? false : true"
				/>
			</div>
			<label class="error-label">{{ errorMenssage }}</label>
			<FormKit type="button" label="Crear" @click="toogleAlert" />
		</div>
		<table-data :typeTable="'sale'" />
	</div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { ref } from 'vue'

import alertWindow from '../components/alertWIndow.vue'
import TableData from '../components/TableData.vue'
import SearchBar from '../components/SearchBar.vue'
import { ActionTypes } from '../store/actions'

export default {
	components: {
		TableData,
		SearchBar,
		alertWindow,
	},
	data: () => ({
		check: true,
		customerSelected: '',
		errorMenssage: '',
		max: 0,
		alertIsActive: ref(false),
		data: { message: 'Descuento general', label: 'Descuento', discount: true },
		customerData: {
			name: '',
			phone: '',
			RFC: '',
			wayToPay: 'EFECTIVO',
			CFDI: '',
			address: '',
		},
		saleData: {
			id: '',
			description: '',
			number: 0,
			unitPrice: 0,
			discount: 0,
		},
	}),

	watch: {
		'customerData.name'(newname) {
			this.customerData.name = newname.toUpperCase()
		},
		'customerData.RFC'(newRFC) {
			this.customerData.RFC = newRFC.toUpperCase()
		},
		'customerData.CFDI'(newCFDI) {
			this.customerData.CFDI = newCFDI.toUpperCase()
		},
		'data.address'(newAddress) {
			if (newAddress) this.data.address = newAddress.toUpperCase()
		},
		'customerData.number'(newnumber) {
			this.saleData.number = Number(newnumber)
		},
		'saleData.unitPrice'(newunitPrice) {
			this.saleData.unitPrice = Number(newunitPrice)
		},
		'saleData.discount'(newdiscount) {
			this.saleData.discount = Number(newdiscount)
		},
	},

	computed: {
		isActive() {
			return this.$store.getters.isActive
		},
		customers() {
			return this.$store.getters.customersInput
		},
		subtotal() {
			let subtotal = 0
			this.$store.getters.sales.map((element) => {
				subtotal += element.amount
			})
			return subtotal
		},
		sales() {
			return this.$store.getters.sales
		},
		customer() {
			return this.$store.getters.customer(this.customerSelected)
		},
	},

	methods: {
		toogleAlert() {
			this.alertIsActive = !this.alertIsActive
			return this.alertIsActive
		},
		getDataByName(data) {
			this.customerSelected = data.id
		},
		setInfo(data) {
			this.createSale(data)
			this.toogleAlert()
		},
		toogleCheck() {
			this.check = !this.check
		},
		getCustomerName(id) {
			return this.$store.getters.customer(id).name
		},
		getData(data) {
			const dataMaterial = this.$store.getters.stock(data.id)
			if (dataMaterial.number > 0) {
				if (dataMaterial.number < 10)
					this.errorMenssage = `Solo queda ${dataMaterial.number} existencia`
				else this.errorMenssage = ''

				this.max = Number(dataMaterial.number)
				this.saleData.id = dataMaterial.id
				this.saleData.description = dataMaterial.description
				this.saleData.unitPrice = dataMaterial.unitPrice
				this.saleData.number = '1'
			} else this.errorMenssage = 'No hay libros en existencia'
		},
		addMaterial() {
			if (this.saleData.number <= this.max) {
				const amount =
					Number(this.saleData.number) *
					(Number(this.saleData.unitPrice) -
						Number(this.saleData.unitPrice) *
							(Number(this.saleData.discount) / 100))
				this.$store.dispatch(ActionTypes.setSale, { ...this.saleData, amount })
				this.saleData.id = ''
				this.saleData.description = ''
				this.saleData.number = ''
				this.saleData.unitPrice = ''
				this.saleData.discount = '0'
				this.errorMenssage = ''
				this.max = 0
			}
		},
		emptyData() {
			this.customerSelected = ''
			this.customerData = {
				name: '',
				phone: '',
				RFC: '',
				wayToPay: 'Efectivo',
				CFDI: '',
			}
		},
		createSale(discountData) {
			if (this.subtotal > 0) {
				let data = {}
				data.material = this.sales
				data.date = new Date()
				data.subtotal = this.subtotal
				if (discountData) {
					data.total =
						this.subtotal - this.subtotal * (discountData.discount / 100)
					data.discount = discountData.discount
				} else {
					data.discount = 0
					data.total = this.subtotal
				}

				if (this.check === true && this.customerSelected !== '') {
					data.isCustomer = true
					data.customerId = this.customerSelected
					data.name = this.getCustomerName(this.customerSelected)
					data.phone = this.customer.phone
					data.RFC = this.customer.RFC
					data.address = this.customer.address
					ipcRenderer.send('create-sale', JSON.parse(JSON.stringify(data)))
					this.$store.dispatch(ActionTypes.emptySales)
					this.emptyData()
				} else {
					if (this.customerData.name !== '' && this.customerData.phone !== '') {
						data.isCustomer = false
						ipcRenderer.send(
							'create-sale',
							JSON.parse(JSON.stringify({ ...data, ...this.customerData }))
						)
						this.$store.dispatch(ActionTypes.emptySales)
						this.emptyData()
					}
				}
			}
		},
	},

	beforeUnmount() {
		this.$store.dispatch(ActionTypes.emptySales)
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

.input {
	border: 1px solid black;
	height: 30px;
	width: 100%;
	border-radius: 6px;
}

.formkit-outer.name {
	width: 250px;
	border: 0 !important;
}
#name {
	width: 100%;
}
#search-material {
	width: 100%;
}

.formkit-outer.CFDI {
	width: 250px;
	border: 0 !important;
}
#CFDI {
	width: 100%;
}

input[type='checkbox'] {
	display: none;
}

.lbl-toggle {
	display: block;
	font-weight: bold;
	font-size: 1.2rem;
	padding: 1rem;
	cursor: pointer;
	border-radius: 7px;
	transition: all 0.25s ease-out;
}

.lbl-toggle:hover {
	color: #000;
}

.lbl-toggle::before {
	content: ' ';
	display: inline-block;
	border-top: 5px solid transparent;
	border-bottom: 5px solid transparent;
	border-left: 5px solid currentColor;
	vertical-align: middle;
	margin-right: 0.7rem;
	transform: translateY(-2px);
	transition: transform 0.2s ease-out;
}

.collapsible-content .content-inner {
	padding: 0.5rem 1rem;
}

.collapsible-content {
	max-height: 0px;
	overflow: hidden;
	transition: max-height 0.25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
	max-height: 100vh;
}

.wrap-search {
	width: 15rem;
}

.error-label {
	color: red;
}
</style>
