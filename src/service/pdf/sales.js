import { jsPDF } from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

export const generateSalePdf = (data) => {
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

	doc.text('FOLIO:', 120, 50)
	doc.text(data.id, 200, 50, 'right')
	doc.text('FECHA:', 120, 55)
	doc.text(
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
		200,
		55,
		'right'
	)
	doc.line(200, 57, 120, 57)
	doc.text('CLIENTE:', 120, 65)
	doc.text(data.name, 200, 65, 'right')

	doc.text(`TELEFONO:`, 120, 70)
	doc.text(`${data.phone || ''}`, 160, 70, 'right')

	doc.text(`RFC:`, 162, 70)
	doc.text(`${data.RFC || ''}`, 200, 70, 'right')

	var finalY = 80
	doc.autoTable({
		startY: finalY,
		columnStyles: {
			2: { halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' },
			5: { halign: 'center' },
		},
		theme: 'plain',
		head: [
			[
				'ISBN',
				'DESCRIPCION',
				'UNIDADES',
				'PRECIO UNITARIO',
				'DESCUENTO',
				'SUBTOTAL',
			],
		],
		body: getBody(data.material),
	})

	doc.text(`SUBTOTAL:`, 150, doc.lastAutoTable.finalY + 10)
	doc.text(
		`$ ${data.subtotal || ''}`,
		190,
		doc.lastAutoTable.finalY + 10,
		'right'
	)

	doc.text(`DESCUENTO:`, 150, doc.lastAutoTable.finalY + 15)
	doc.text(
		`${data.discount || ''}%`,
		190,
		doc.lastAutoTable.finalY + 15,
		'right'
	)

	doc.text(`IVA:`, 150, doc.lastAutoTable.finalY + 20)
	doc.text(`${data.IVA || ''}%`, 190, doc.lastAutoTable.finalY + 20, 'right')

	doc.text('TOTAL:', 150, doc.lastAutoTable.finalY + 25)
	doc.text(`$ ${data.total || ''}`, 190, doc.lastAutoTable.finalY + 25, 'right')

	doc.line(20, doc.lastAutoTable.finalY + 30, 80, doc.lastAutoTable.finalY + 30)
	doc.setFontSize(8)
	doc.text('FECHA Y FIRMA DE CONFORMIDAD', 25, doc.lastAutoTable.finalY + 35)

	doc.save(`${data.id}_sale.pdf`)
}

const getBody = (data) => {
	const body = []
	data.map((element) => {
		const row = []
		row.push(element.ISBN || '')
		row.push(element.description || '')
		row.push(element.number || '')
		row.push(`$ ${element.unitPrice}` || '')
		row.push(`${element.discount}%` || 0)
		row.push(`$ ${element.amount}` || 0)
		body.push(row)
	})
	return body
}
