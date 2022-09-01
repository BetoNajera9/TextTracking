import { jsPDF } from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

export const generateSalePdf = (path, data) => {
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

	doc.text('FOLIO:', minCustomerX, customerY)
	doc.text(data.id, maxX, customerY, 'right')
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
	doc.text(`${data.phone || ''}`, minCustomerX + 35, customerY + 35, 'right')

	doc.text(`RFC:`, minCustomerX + 37, customerY + 35)
	doc.text(`${data.RFC || ''}`, maxX, customerY + 35, 'right')

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
		`$ ${
			data.subtotal
				? data.subtotal
						.toFixed(2)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				: '0'
		}`,
		190,
		doc.lastAutoTable.finalY + 10,
		'right'
	)

	doc.text(`DESCUENTO:`, 150, doc.lastAutoTable.finalY + 15)
	doc.text(
		`${
			data.discount
				? data.discount
						.toFixed(2)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				: '0'
		}%`,
		190,
		doc.lastAutoTable.finalY + 15,
		'right'
	)

	doc.text(`IVA:`, 150, doc.lastAutoTable.finalY + 20)
	doc.text(`${data.IVA || ''}%`, 190, doc.lastAutoTable.finalY + 20, 'right')

	doc.text('TOTAL:', 150, doc.lastAutoTable.finalY + 25)
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
		doc.lastAutoTable.finalY + 25,
		'right'
	)

	doc.line(20, doc.lastAutoTable.finalY + 30, 80, doc.lastAutoTable.finalY + 30)
	doc.setFontSize(8)
	doc.text('FECHA Y FIRMA DE CONFORMIDAD', 25, doc.lastAutoTable.finalY + 35)

	doc.text('OBSERVACIONES:', minX, doc.lastAutoTable.finalY + 49)
	doc.line(
		minX,
		doc.lastAutoTable.finalY + 50,
		maxX,
		doc.lastAutoTable.finalY + 50
	)
	doc.line(
		minX,
		doc.lastAutoTable.finalY + 50,
		minX,
		doc.lastAutoTable.finalY + 70
	)
	doc.line(
		maxX,
		doc.lastAutoTable.finalY + 50,
		maxX,
		doc.lastAutoTable.finalY + 70
	)
	doc.line(
		minX,
		doc.lastAutoTable.finalY + 70,
		maxX,
		doc.lastAutoTable.finalY + 70
	)
	const lines = doc.setFontSize(8).splitTextToSize(data.remarks, 170)
	doc.text(minX + 2, doc.lastAutoTable.finalY + 55, lines)

	doc.save(path)
}

const getBody = (data) => {
	const body = []
	data.map((element) => {
		const row = []
		row.push(element.ISBN ?? '')
		row.push(element.description ?? '')
		row.push(element.number ?? '')
		row.push(
			`$ ${
				element.unitPrice
					? element.unitPrice
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
				element.amount
					? element.amount
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
