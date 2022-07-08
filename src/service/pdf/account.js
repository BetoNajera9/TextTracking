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

export const generateAccountPdf = (data) => {
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

	doc.text('ESTADO DE CUENTA', 140, 45)
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
		headStyles: { halign: 'center' },
		columnStyles: {
			0: { cellWidth: 30 },
			1: { halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' },
			5: { halign: 'center' },
			6: { halign: 'center' },
		},
		theme: 'plain',
		head: [
			[
				'FOLIO',
				'FECHA',
				'DESCRIPCION',
				'CANTIDAD',
				'PRECION UNITARIO',
				'DESCUENTO',
				'IMPORTE',
			],
		],
		body: getBody(data.movements),
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

	doc.save(`a4_account.pdf`)
}

const getBody = (data) => {
	const sortData = data
		.sort((objA, objB) => {
			let fa = objA.id,
				fb = objB.id

			if (fa < fb) {
				return -1
			}
			if (fa > fb) {
				return 1
			}
			return 0
		})
		.sort((objA, objB) => Number(objA.date) - Number(objB.date))
	const body = []

	sortData.map((element) => {
		const row = []
		const date = new Date(element.date)
		row.push(element.id || '')
		row.push(
			`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
		)
		row.push(element.description || '')
		row.push(`${element.number || '-'}`)
		row.push(`$ ${element.unitPrice || '-'}`)
		row.push(`${element.discount || '-'}%`)
		row.push(`$ ${element.total || '-'}%`)
		body.push(row)
	})
	return body
}
