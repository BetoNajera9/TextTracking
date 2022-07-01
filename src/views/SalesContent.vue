<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Ventas</h1>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'submit' }"
			sunmit-label="Crear"
			actions-class="submit"
			message-class="message"
		>
			<div class="wrap-collabsible">
				<input
					id="collapsible"
					class="toggle"
					type="checkbox"
					@click="setCheck1"
					value="user-registered"
					v-bind="{ checked: check1 }"
				/>
				<label for="collapsible" class="lbl-toggle">Cliente Registrado</label>
				<div class="collapsible-content">
					<div class="content-inner">
						<FormKit name="account" type="group" :disabled="!check1">
							<FormKit
								id="WayToPay"
								type="select"
								label="Cliente"
								:options="['Roberto Miron Najera', 'Norma Najera Nunez']"
								input-class="$reset input"
								inner-class="$reset inner"
							/>
						</FormKit>
					</div>
				</div>
			</div>
			<div class="wrap-collabsible">
				<input
					id="collapsible"
					class="toggle"
					type="checkbox"
					@click="setCheck2"
					value="user"
					v-bind="{ checked: check2 }"
				/>
				<label for="collapsible" class="lbl-toggle">Cliente</label>
				<div class="collapsible-content">
					<div class="content-inner form">
						<FormKit name="account" type="group" :disabled="!check2">
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
								id="WayToPay"
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
					</div>
				</div>
			</div>
			<div class="sale-data form">
				<FormKit
					id="search-material"
					type="search"
					label="Material"
					validation="required"
					:validation-messages="{
						required: 'El Nombre del material es requerido.',
					}"
					input-class="$reset input"
					inner-class="$reset inner"
					outer-class="name"
				/>
				<FormKit
					id="amount"
					type="number"
					label="Cantidad"
					value="1"
					step="1"
					min="1"
					max="20"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
				<FormKit
					id="price"
					type="text"
					label="Precio"
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
					validation="required"
					input-class="$reset input"
					inner-class="$reset inner"
				/>
			</div>
		</FormKit>
		<table-data :typeTable="'sales'" />
	</div>
</template>

<script>
import TableData from '../components//TableData.vue'
export default {
	components: {
		TableData,
	},
	data: () => ({
		isActive: false,
		check1: true,
		check2: false,
	}),

	props: {
		setActive: Boolean,
	},

	methods: {
		setCheck1() {
			this.check1 = !this.check1
			this.check2 = !this.check1
		},
		setCheck2() {
			this.check1 = !this.check1
			this.check2 = !this.check1
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
</style>
