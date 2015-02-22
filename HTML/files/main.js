var horario = {
		r22: { // Ruta 22
			rn : {}, // Roca - Neuquen
			nr : {} // Neuquen - Roca
		}
	},
	nameTrad = {
		nqn: 'Neuquen',
		cipolletti: 'Cipolletti',
		oro: 'F. Oro',
		allen: 'Allen',
		guerrico: 'Guerrico',
		gomez: 'J. J. Gomez',
		roca: 'Gral. Roca'
	};

function $defined(x) {
	return typeof x !== 'undefined';
}

function loadCsv(name, direction) {
	$.ajax({
		url: 'files/' + name + '-' + direction + '.csv',
		dataType: 'text',
		success: function(data) {
			var lines = data.split('\n'), dc = [];
			for (var i in lines) {
				var line = lines[i].split(',');
				for (var j in line) {
					var d = line[j];
					if (i == 0) {
						horario[name][direction][d] = [];
						dc[j] = d;
					} else {
						horario[name][direction][dc[j]][horario[name][direction][dc[j]].length] = d;
					}
				}
			}
		}
	});
}

function setData(cnt) {
	$('#data').empty().append(cnt);
}

function filtrarHorario() {
	alert('Buscando!');
}

function verHorarios(name, direction) {
	var r = horario[name][direction],
		th = $('<tr></tr>'),
		tb = $('<tbody></tbody>'),
		table = $('<table data-role="table" data-mode="reflow"></table>'),
		tr = [];
	for (var t in r) {
		th.append($('<th>').html(nameTrad[t]));
		for (var i in r[t]) {
			var v = r[t][i];
			if (!$defined(tr[i])) tr[i] = $('<tr></tr>');
			tr[i].append($('<td></td>').html((v == '') ? '&nbsp;' : v));
		}
	}
	for (var i in tr) {
		tb.append(tr[i]);
	}
	table.append($('<thead></thead>').append(th)).append(tb);
	setData(table);
}

$(function() {
	// Load
	loadCsv('r22', 'nr');
	loadCsv('r22', 'rn');
});