var heads;

function buildTable(cont, o) {
	var t = $('<tbody></tbody>'),
		h = $('<tr></tr>'),
		tr;

	heads.each(function (k, v) {
		h.append($('<th></th>').html($db.localidades.get(v).text));
	});

	o.each(function (k, g) {
		tr = $('<tr></tr>');

		heads.each(function (k, v) {
			tr.append($('<td></td>').html((g[v] !== undefined) ? g[v] : null));
		});

		t.append(tr);
	});

	$(cont)
		.html('')
		.append($('<table></table>')
			.append($('<thead></thead>').append(h))
			.append(t));
}

function strToObject(s) {
	var d = [], f = true;
	heads = [];
	
	s.split(/\n/g).each(function (irow, row) {
		if (row.trim()) { // Not empty row
			var recorrido = [];

			row.split(/\t/g).each(function (itd, td) {
				td = td.trim();
			
				if (f) { // First Row
					td = td.toLowerCase();
					$db.localidades.each(function () {
						var localidad = this;
						localidad.convert.each(function (icloc, tcloc) {
							if (td.contains(tcloc)) {
								heads[itd] = localidad.id;
								return false;
							}
						});
					});
				} else if (td) { // Not empty cell
					// Body
					if (/^\d+[^\d]\d+$/.test(td)) {
						var partes = td.split(/[^\d]/);
						var hr = parseFloat(partes[0].trim() + '.' + partes[1].trim()).toString();
						hr = hr
							.replace(/^(\d)\./, '0$1.')
							.replace(/\.(\d)$/, '.$10')
							.replace(/^(\d)$/, '0$1.00')
							.replace(/^(\d{2})$/, '$1.00');
						recorrido.push({
							localidad: heads[itd],
							hora: hr
						});
					}
				}
			});

			f = false;

			if (recorrido.length > 1)
				d.push(recorrido);
		}
	});

	return d;
}

function proccessTable(txtIn, table) {
	var v = $('#' + txtIn).val();
	localStorage.setItem(txtIn, v);
	var o = strToObject(v);
	//buildTable(table, o);
	return o;
}
