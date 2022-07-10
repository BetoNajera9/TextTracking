<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Estados de Cuenta</h1>
		<div class="div-wrap">
			<div class="wrap-search">
				<label class="formkit-label">Cliente</label>
				<search-bar
					:dataType="'customers'"
					:propSearch="'name'"
					:setData="getDataByName"
				/>
			</div>
			<br />
			<div>
				<FormKit
					id="paymentForm"
					type="form"
					:config="{ validationVisibility: 'submit' }"
					form-class="form"
					actions-class="submit"
					message-class="message"
					submit-label="Pagar"
					@submit="createPayment"
				>
					<FormKit
						id="payment-account-states"
						type="number"
						label="Cantidad a Pagar"
						v-model="payment"
						validation="required"
						:validation-messages="{
							required: 'La cantidad a pagar es requerida.',
						}"
						input-class="$reset input"
						inner-class="$reset inner"
					/>
				</FormKit>
			</div>
		</div>
		<div class="wrapp-tools">
			<FormKit
				type="button"
				label="PDF"
				@click="generatePdf"
				:disabled="customer.length > 0 ? false : true"
			/>
			<p v-show="customer.length > 0">
				{{ `Total: ${account.total}` }}
			</p>
		</div>
		<table-data :typeTable="'account'" :filters="customer" />
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
		customer: [],
		payment: 0,
	}),

	watch: {
		payment() {
			this.payment = Number(this.payment)
		},
	},

	methods: {
		getDataByName(data) {
			this.customer = [data]
		},
		createPayment() {
			if (this.customer.length > 0 && this.payment > 0) {
				ipcRenderer.send(
					'add-movements-to-account',
					{ id: this.customer[0].id },
					{
						movement: 'PAYMENT',
						total: this.payment * -1,
						date: new Date(),
					}
				)

				this.$formkit.reset('paymentForm')
			}
		},
		generatePdf() {
			ipcRenderer.send(
				'save-account-pdf',
				JSON.parse(JSON.stringify(this.account))
			)
		},
	},

	computed: {
		isActive() {
			return this.$store.getters.isActive
		},
		account() {
			if (this.customer.length > 0)
				return this.$store.getters.account(this.customer[0].id)
			return {}
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

.div-wrap {
	display: flex;
	flex-direction: column;
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

br {
	height: 5px;
	background: black;
}

.wrapp-tools {
	display: flex;
}
</style>
