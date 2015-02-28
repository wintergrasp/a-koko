function generarHorario(RocaAllen, AllenRoca, title, days, fileName) {
	var str = '',
		i = 0;

	RocaAllen.each(function () {
		var ra = $(RocaAllen.get(i)).text().replace(/^\s+[\n\r]+/g, '').replace(/[\n\r]+\s+$/g, '').replace(/-/g, '\t');
		var ar = $(AllenRoca.get(i)).text().replace(/^\s+[\n\r]+/g, '').replace(/[\n\r]+\s+$/g, '').replace(/-/g, '\t');

		if (i > 0)
			str += '\n\n.concat(\n';

		str += '// FileName: ' + fileName + '\n' +
			getFileCont(
				strToObject(ra).concat(strToObject(ar)),
				title, days);

		if (i > 0)
			str += '\n\n)\n';

		i++;
	});

	try {
		var test = eval(str);
		if (!test)
			throw 'Test Error!';
	} catch (e) {
		var m = 'Error al generar "' + title + '" (' + fileName + ' / ' + days + ')';
		alert(m);
		throw m;
	}

	if (str.contains('undefined')) {
		alert('Faltan localidades para "' + title + '" (' + fileName + ' / ' + days + ')');
	}

	var ctrl = $('<textarea readonly="readonly"></textarea>');
	ctrl.val(str);
	$('#outCont').append(ctrl);
}

$(function () {
	$('#horarios fieldset').each(function () {
		var p = $(this),
			RocaAllen = p.find('.RocaAllen'),
			AllenRoca = p.find('.AllenRoca'),
			Title = p.attr('title'),
			Days = p.attr('days'),
			FileName = p.attr('fileName');
		generarHorario(RocaAllen, AllenRoca, Title, Days, FileName);
	});
});