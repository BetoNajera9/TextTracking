<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Estados de Cuenta</h1>
		<div class="div-wrap">
			<div>
				<FormKit
					id="customer-account-states"
					type="select"
					label="Cliente"
					:options="['Colegio Howart', 'Colegio Howart']"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
			</div>
			<br />
			<div>
				<FormKit
					id="payment-account-states"
					type="number"
					label="Cantidad a Pagar"
					validation="required"
					:validation-messages="{
						required: 'La cantidad a pagar es requerida.',
					}"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
				<FormKit
					type="form"
					:config="{ validationVisibility: 'submit' }"
					sunmit-label="Buscar"
					form-class="form"
					actions-class="submit"
					message-class="message"
				/>
			</div>
		</div>
		<table-data :propData="propsTable" :propDataTable="propsData" />
	</div>
</template>

<script>
import TableData from '../components/TableData.vue'

export default {
	components: {
		TableData,
	},
	data: () => ({
		isActive: false,
		propsTable: [
			'Folio',
			'Descripcion',
			'Cantidad',
			'Precio Unitario',
			'Descuento',
			'Importe',
		],
		propsData: [
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
			{
				Folio: '12345678',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00',
			},
		],
	}),

	props: {
		setActive: Boolean,
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
</style>
