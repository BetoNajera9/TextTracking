<template>
	<div class="table">
		<table class="data-table">
			<tr>
				<th v-for="prop in propData" :key="prop">
					<span>{{ prop }}</span>
				</th>
			</tr>
			<tr v-for="data in propDataTable" :key="data.id">
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
				ISBN: '1234567890',
				Descripcion: 'Kit me divierto y aprendo en Prescolar 1 L/C',
				Cantidad: 1,
				'Precio unitario': 64,
				Descuento: 10,
				Importe: 120,
			},
		],
	}),

	props: {
		propData: Array,
		propDataTable: Array,
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
