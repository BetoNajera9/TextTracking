import { jsPDF } from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

export const generateDebitBalancePdf = (path, data) => {
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	]
	const date = new Date(data.date)

	const customerY = 35
	const minCustomerX = 110
	const minX = 16
	const maxX = 192

	const doc = new jsPDF('p', 'mm', [210, 297])

	// Header table
	doc.line(minX - 2, customerY - 5, maxX + 3, customerY - 5)
	doc.line(minX - 2, customerY - 5, minX - 2, customerY + 40)
	doc.line(minCustomerX - 5, customerY - 5, minCustomerX - 5, customerY + 40)
	doc.line(maxX + 3, customerY - 5, maxX + 3, customerY + 40)
	doc.line(minX - 2, customerY + 40, maxX + 3, customerY + 40)

	doc.setFontSize(12)
	doc.text('CREATIVIDAD EDUCATIVA', 105, 20, 'center')

	doc.setFontSize(10)
	doc.text('MARCELA ELENA ZUÑIGA TORRES', minX, customerY + 10)
	doc.text('SACALUM 58 LOMAS DE PADIERNA', minX, customerY + 15)
	doc.text('RFC: ZUTM680814BM7', minX, customerY + 20)
	doc.text('TEL. OFICINA: 55 30 89 25 79 CEL: 5516577552', minX, customerY + 25)
	doc.text('EMAIL: marce_helen@hotmail.com', minX, customerY + 30)

	var finalY = 80
	doc.autoTable({
		startY: finalY,
		headStyles: { halign: 'center' },
		columnStyles: {
			2: { halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' },
			5: { halign: 'right' },
		},
		head: [['NOMBRE', 'RFC', 'SALDO']],
		body: getBody(data),
	})

	doc.save(path)
}

const getBody = (data) => {
	const body = []
	data.map((element) => {
		const row = []
		row.push(element.name ?? '')
		row.push(element.RFC ?? '')
		row.push(
			`$ ${
				element.total
					? element.total
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					: '0'
			}`
		)
		body.push(row)
	})
	return body
}
