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

export const generateAccountPdf = (path, data) => {
	const date = new Date()

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

	doc.text('ESTADO DE CUENTA', minCustomerX + 40, customerY, 'center')
	doc.text('FECHA:', minCustomerX, customerY + 5)
	doc.text(
		`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
		maxX,
		customerY + 5,
		'right'
	)
	doc.line(minCustomerX - 5, customerY + 6, maxX + 3, customerY + 6)
	doc.text('CLIENTE:', minCustomerX, customerY + 10)
	doc.text(data.name, maxX, customerY + 10, { align: 'right', maxWidth: 64 })

	doc.text(`DOMICILIO:`, minCustomerX, customerY + 20)
	doc.setFontSize(8)
	doc.text(`${data.address || ''}`, maxX, customerY + 20, {
		align: 'right',
		maxWidth: 62,
	})
	doc.setFontSize(10)

	doc.text(`CFDI:`, minCustomerX, customerY + 30)
	doc.text(`${data.CFDI || ''}`, maxX, customerY + 30, 'right')

	doc.text(`TEL.:`, minCustomerX, customerY + 35)
	doc.text(`${data.phone || ''}`, minCustomerX + 40, customerY + 35, 'right')

	doc.text(`RFC:`, minCustomerX + 42, customerY + 35)
	doc.text(`${data.RFC || ''}`, maxX, customerY + 35, 'right')

	var finalY = 80
	doc.autoTable({
		startY: finalY,
		headStyles: { halign: 'center' },
		columnStyles: {
			0: { cellWidth: 40 },
			1: { halign: 'center' },
			2: { halign: 'right' },
			3: { halign: 'center' },
			4: { halign: 'right' },
		},
		head: [['FOLIO', 'FECHA', 'SUBTOTAL', 'DESCUENTO', 'IMPORTE']],
		body: getBody(data.movements),
	})

	doc.text('TOTAL:', 150, doc.lastAutoTable.finalY + 10)
	doc.text(
		`$ ${
			data.total
				? data.total
						.toFixed(2)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				: '0'
		}`,
		190,
		doc.lastAutoTable.finalY + 10,
		'right'
	)

	doc.line(20, doc.lastAutoTable.finalY + 30, 80, doc.lastAutoTable.finalY + 30)
	doc.setFontSize(8)
	doc.text('FECHA Y FIRMA DE CONFORMIDAD', 25, doc.lastAutoTable.finalY + 35)

	doc.save(path)
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
		.sort(
			(objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date))
		)
	const body = []

	sortData.map((element) => {
		const row = []
		const date = new Date(element.date)
		row.push(element.id || '')
		row.push(
			`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
		)
		row.push(
			`$ ${
				element.subtotal
					? element.subtotal
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					: '0'
			}`
		)
		row.push(
			`${
				element.discount
					? element.discount
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					: '0'
			}%`
		)
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
