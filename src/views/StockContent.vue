<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Almacén</h1>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'submit' }"
			sunmit-label="Crear"
			form-class="form"
			actions-class="submit"
			message-class="message"
		>
			<FormKit
				id="name"
				type="text"
				label="Nombre"
				validation="required"
				:validation-messages="{
					required: 'El nombre es requerido.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="name"
			/>

			<FormKit
				id="phone"
				type="tel"
				label="Telefono"
				validation="required|matches:/^[0-9]{10}$/"
				:validation-messages="{
					required: 'El telefono es requerido.',
					matches: 'El telfono debe de ser minimo 10 numeros.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
			/>

			<FormKit
				id="RFC"
				type="text"
				label="RFC"
				validation="required|matches:/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/"
				:validation-messages="{
					required: 'El RFC es requerido.',
					matches: 'El formato del RFC es invalido.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
			/>

			<FormKit
				id="way-to-pay"
				type="select"
				label="Forma de pago"
				:options="['Efectivo', 'Tarjeta de credito/debito']"
				input-class="$reset input"
				inner-class="$reset inner"
			/>

			<FormKit
				id="CFDI"
				type="text"
				label="Uso de CFDI"
				validation="required"
				:validation-messages="{
					required: 'El CFDI es requerido.',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="name"
			/>
		</FormKit>
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
		propsTable: ['Clave', 'Descripcion', 'Cantidad', 'Precio Unitario', 'Descuento', 'Importe'],
		propsData: [
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
			},
			{
				Clave: '9786076271612',
				Descripcion: 'Kit me divierto y aprendo en preescolar 1 L/C',
				Cantidad: '1',
				'Precio Unitario': '$320.00',
				Descuento: '$64.00',
				Importe: '$640.00'
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
#CFDI {
	width: 100%;
}
</style>
