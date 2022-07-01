<template>
	<div :class="{ content: 'content', active: isActive }">
		<h1>Historial</h1>
		<FormKit
			type="form"
			:config="{ validationVisibility: 'submit' }"
			sunmit-label="Buscar"
			form-class="form"
			actions-class="submit"
			message-class="message"
		>
			<FormKit
				id="name-history"
				type="text"
				label="Nombre del Cliente"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="name-history"
			/>

			<FormKit
				id="description-history"
				type="text"
				label="Descripción"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="description-history"
			/>

			<FormKit
				id="folio-history"
				type="text"
				label="Folio"
				input-class="$reset input"
				inner-class="$reset inner"
				outer-class="folio-history"
			/>
		</FormKit>
		<table-data :typeTable="'history'" />
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
</style>
