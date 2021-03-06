var heads;

var loc = [
	'Neuquen Terminal', // 0
	'Neuquen', // 1
	'Cipolletti', // 2
	'Cipolletti (x Alem)', // 3
	'Puente 83', // 4
	'Fernandez Oro', // 5
	'Isla 10', // 6
	'Allen', // 7
	'Hospital', // 8
	'Santa Catalina', // 9
	'Guerrico', // 10
	'J. J. Gomez', // 11
	'General Roca', // 12
	'Stefenelli', // 13
	'Cervantes', // 14
	'Mainque', // 15
	'Huergo', // 16
	'Godoy', // 17
	'Villa Regina' // 18
];


var locConv = {
	0: ['terminal', 'eton'],
	1: ['nqn', 'neuqu'],
	2: ['cipo'],
	3: ['alem'],
	4: ['83'],
	5: ['oro', 'fernandez oro'],
	6: ['10'],
	7: ['allen'],
	8: ['hospital'],
	9: ['catalina', 'stacat'],
	10: ['guerrico', 'gerrico'],
	11: ['gomez'],
	12: ['roca'],
	13: ['stefenelli'],
	14: ['cervantes'],
	15: ['mainque', 'maique'],
	16: ['huergo'],
	17: ['godoy'],
	18: ['regina', 'villa']
};

function buildTable(cont, o) {
	var t = $('<tbody></tbody>'),
		h = $('<tr></tr>'),
		tr;

	heads.each(function (k, v) {
		h.append($('<th></th>').html(loc[v]));
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

/*
[
	// Allen -> Roca
	{
		 5.30: 3, // Allen
		 5.40: 4, // Guerrico
		 5.50: 5, // Gomez
		 6.00: 6  // Roca
	},
	{
*/

function strToObject(s) {
	var d = [], f = true;
	heads = [];
	
	s.split(/\n/g).each(function (irow, row) {
		if (row.trim()) {
			var r = {};

			row.split(/\t/g).each(function (itd, td) {
				td = td.trim();
			
				if (f) {
					// First Row
					td = td.toLowerCase();
					locConv.each(function (li) {
						this.each(function () {
							if (td.contains(this)) {
								heads[itd] = parseInt(li, 10);
								return false;
							}
						});
					});
				} else if (td) {
					// Next Rows
					if (/^\d+[:.,;]\d+$/.test(td)) {
						var partes = td.split(/[:.,;]/);
						var hr = parseFloat(partes[0].trim() + '.' + partes[1].trim()).toString();
						hr = hr
							.replace(/^(\d)\./, '0$1.')
							.replace(/\.(\d)$/, '.$10')
							.replace(/^(\d)$/, '0$1.00')
							.replace(/^(\d{2})$/, '$1.00');
						r[hr] = heads[itd];

					}
				}
			});

			f = false;
			
			if (r.length > 1)
				d.push(r);
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

function getFileCont(o, title, days) {
	return '// ' + title + '\n' +
		'// ' + days + '\n' +
		('[' + o.toStr() + ']')
			.replace('\[{', '[\n\t{')
			.replace(/\}\]/g, '\n\t}\n]')
			.replace(/\{"/g, '{\n\t\t"')
			.replace(/\},\{/g, '\n\t},\n\t{')
			.replace(/":/g, '": ')
			.replace(/,"/g, ',\n\t\t"')
			//.replace(/"/g, '')
		;
}

function proccess() {
	// Roca -> Allen
	var o = proccessTable('txtInRA', '#tableOutRA');
	// Allen -> Roca
	o = o.concat(proccessTable('txtInAR', '#tableOutAR'));

	localStorage.setItem('txtTitle', $('#txtTitle').val());
	localStorage.setItem('txtDays', $('#txtDays').val());

	// Output
	$('#txtOut').val(getFileCont(o,
		$('#txtTitle').val(), $('#txtDays').val()));
}

$(function () {
	$('#txtInRA').val(localStorage.txtInRA);
	$('#txtInAR').val(localStorage.txtInAR);
	$('#txtTitle').val(localStorage.txtTitle);
	$('#txtDays').val(localStorage.txtDays);
});