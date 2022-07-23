import { jsPDF } from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

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

export const generateStockPdf = (path, data) => {
	const date = new Date()

	const customerY = 45
	const minCustomerX = 110
	const minX = 16
	const maxX = 192

	const doc = new jsPDF('p', 'mm', [210, 297])

	// Header table
	doc.line(minX - 2, customerY - 5, maxX + 3, customerY - 5)
	doc.line(minX - 2, customerY - 5, minX - 2, customerY + 25)
	doc.line(minCustomerX - 5, customerY - 5, minCustomerX - 5, customerY + 25)
	doc.line(maxX + 3, customerY - 5, maxX + 3, customerY + 25)
	doc.line(minX - 2, customerY + 25, maxX + 3, customerY + 25)

	doc.setFontSize(12)
	doc.text('CREATIVIDAD EDUCATIVA', 105, 20, 'center')

	doc.setFontSize(10)
	doc.text('MARCELA ELENA ZUÑIGA TORRES', minX, customerY)
	doc.text('SACALUM 58 LOMAS DE PADIERNA', minX, customerY + 5)
	doc.text('RFC: ZUTM680814BM7', minX, customerY + 10)
	doc.text('TEL. OFICINA: 55 30 89 25 79 CEL: 5516577552', minX, customerY + 15)
	doc.text('EMAIL: marce_helen@hotmail.com', minX, customerY + 20)

	doc.text('ALMACEN', minCustomerX + 40, customerY, 'center')
	doc.text('FECHA:', minCustomerX, customerY + 5)
	doc.text(
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
		maxX,
		customerY + 5,
		'right'
	)

	var finalY = 80
	doc.autoTable({
		startY: finalY,
		headStyles: { halign: 'center' },
		columnStyles: {
			0: { halign: 'center', cellWidth: 40 },
			2: { halign: 'center', cellWidth: 30 },
		},
		head: [['ISBN', 'DESCRIPCION', 'ENTRADA', 'SALIDA', 'CANTIDAD']],
		body: getBody(data),
	})

	doc.save(path)
}

const getBody = (data) => {
	const body = []

	data.map((element) => {
		const row = []
		row.push(element.ISBN || '')
		row.push(element.description || '')
		row.push(`${element.in || '0'}`)
		row.push(`${element.out || '0'}`)
		row.push(`${element.stock || '0'}`)
		body.push(row)
	})
	return body
}
