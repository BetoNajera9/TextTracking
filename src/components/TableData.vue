<template>
	<div class="table">
		<table class="data-table">
			<tr>
				<th v-for="prop in propData" :key="prop">
					<span>{{ prop }}</span>
				</th>
			</tr>
			<tr v-for="data in schemas" :key="data.id">
				<td v-for="prop in propData" :key="prop">
					<span>{{ data[prop] }}</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	data: () => ({
		schemas: [
			{
				Nombre: 'Roberto Miron Najera',
				Telefono: '5548328860',
				RFC: 'RFCDEBETO',
				'Forma de pago': 'Efectivo',
				CFDI: 'CFDI',
			},
		],
	}),

	props: {
		propData: Array,
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
