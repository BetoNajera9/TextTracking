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

	const doc = new jsPDF('p', 'mm', [210, 297])

	doc.setFontSize(12)
	doc.text('MARCELA ELENA ZUÑIGA TORRES', 105, 20, 'center')
	doc.text('HERRAMIENTAS PARA LA EDUCACION Y EL APRENDIZAJE', 105, 30, 'center')

	doc.setFontSize(10)
	doc.text('MARCELA ELENA ZUÑIGA TORRES', 10, 50)
	doc.text('SACALUM 58 LOMAS DE PADIERNA', 10, 55)
	doc.text('RFC: ZUTM680814BM7', 10, 60)
	doc.text('TEL. OFICINA 55 30 89 25 79 CEL 5516577552', 10, 65)
	doc.text('EMAIL: marce_helen@hotmail.com', 10, 70)

	doc.text('ALMACEN', 150, 45)
	doc.text('FECHA:', 120, 55)
	doc.text(
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
		200,
		55,
		'right'
	)

	var finalY = 80
	doc.autoTable({
		startY: finalY,
		headStyles: { halign: 'center' },
		columnStyles: {
			0: { halign: 'center', cellWidth: 30 },
			1: { halign: 'center' },
			2: { halign: 'center' },
			3: { halign: 'center' },
		},
		theme: 'plain',
		head: [['ISBN', 'DESCRIPCION', 'CANTIDAD', 'PRECIO UNITARIO']],
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
		row.push(`${element.number || '0'}`)
		row.push(`$ ${element.unitPrice || '0'}`)
		body.push(row)
	})
	return body
}
