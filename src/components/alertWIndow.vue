<template>
	<div class="wrapp-alert-window" v-if="setActive ? true : false">
		<div class="alert-window">
			<h1>{{ data.message }}</h1>
			<FormKit
				v-if="data.discount ? true : false"
				id="discount"
				type="number"
				label="Descuento"
				step="10"
				min="0"
				max="100"
				v-model="res.discount"
				validation="required|matches:/^[0-9]+$/"
				:validation-messages="{
					required: 'Ingresar descuento',
					matches: 'Ingesar descuento valida',
				}"
				input-class="$reset input"
				inner-class="$reset inner"
			/>
			<div class="buttons">
				<button @click="submit(1)">Ok</button>
				<button v-if="data.discount ? false : true" @click="submit">
					Cancelar
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { watch, ref } from 'vue'

export default {
	props: {
		setActive: Boolean,
		sendInfo: Function,
		data: Object,
	},
	setup(props) {
		const res = ref({
			discount: 0,
		})

		const submit = (info) => {
			if (!props.data.discount && info === 1) {
				res.value.discount = 1
			}

			if (res.value.discount === 0) {
				props.sendInfo()
			} else {
				props.sendInfo(res.value)
				res.value.discount = 0
			}
		}

		watch(
			() => res.value.discount,
			(newVal) => {
				res.value.discount = Number(newVal)
			}
		)

		return {
			submit,
			res,
		}
	},
}
</script>

<style scoped>
.wrapp-alert-window {
	position: absolute;
	top: 0px;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.245);
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.alert-window {
	margin: auto;
	background: white;
	width: 420px;
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	border: 1px solid black;
	padding: 10px 30px;
}

.buttons {
	display: flex;
	justify-content: space-evenly;
	width: 100%;
}

.buttons > button {
	width: 150px;
}

.alert-window > h1 {
	margin: 0;
	text-align: center;
}
</style>
