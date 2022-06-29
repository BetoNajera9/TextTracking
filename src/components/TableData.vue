<template>
	<div class="table">
		<table class="data-table">
			<tr>
				<th v-for="prop in propsTable" :key="prop">
					<span>{{ prop }}</span>
				</th>
			</tr>
			<tr v-for="data in customer" :key="data.id">
				<td v-for="(value, prop) in propsTable" :key="prop">
					<span>{{ data[prop] }}</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({
		propsTable: {},
	}),

	computed: {
		...mapGetters({ customer: 'customer/customers' }),
	},

	created() {
		switch (this.typeTable) {
			case 'customer':
				this.propsTable = {
					name: 'Nombre',
					phone: 'Telefono',
					RFC: 'RFC',
					'way-to-pay': 'Forma de pago',
					CFDI: 'CFDI',
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
	width: 100%;
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
</style>
