/** ********* **
 *  Prototype  *
 ** ********* **/
(function () {
	function SortMode(col, desc) {
		if (this instanceof String.SortMode) {
			this.value = col.valueOf(col);
			this.desc = desc;
			this.asc = !desc;

			this.toString = function () { return this.value; };
		} else {
			return new String.SortMode(col, desc);
		}
	}

	String.SortMode = SortMode;

	Object.defineProperties(Array.prototype, {
		contains: { value: function (x) { return this.indexOf(x) > -1; } },
		sortBy: {
			value: function (col) {
				if (arguments.length > 1) {
					var i;
					for (i = arguments.length - 1; i >= 0; i--)
						this.sortBy(arguments[i]);
				} else {
					if (typeof col === 'function')
						col = col.apply(col);
					if (col instanceof String.SortMode) {
						if (col.desc) {
							// DESC
							col = col.value;
							this.sort(function (a, b) {
								if (a[col] < b[col])
									return 1;
								if (a[col] > b[col])
									return -1;
								return 0;
							});
						} else {
							// ASC
							col = col.value;
							this.sort(function (a, b) {
								if (a[col] < b[col])
									return -1;
								if (a[col] > b[col])
									return 1;
								return 0;
							});
						}
					} else {
						this.sortBy(col.asc());
					}
				}

				return this;
			}
		}
	});

	Object.defineProperties(String.prototype, {
		toHour: { value: function () {
			var x = this.replace('.', ':')
				.replace(/^(\d+)$/, '$1:00')
				.replace(/:(\d)$/, ':$10');
			if (x.length === 4)
				x = '0' + x;
			return x;
		}},

		// Repeat
		repeat: { value: function (n) {
			n = parseInt(n, 10);
			if (isNaN(n) || n < 0)
				return null;
			return new Array(n + 1).join(this);
		}},

		// Contains
		contains: { value: function (x) { return this.indexOf(x) > -1; }},

		// Format String
		format: { value: function () {
			var s = this, i;
			for (i = 0; i < arguments.length; i++)
				s = s.replace("%" + i, arguments[i]);
			return s;
		}},

		// Cut and add "..." to the end
		cut: { value: function (max, end /*'...'*/) {
			if (end)
				end = end.toString().trim();
			if (!end)
				end = '...';
			var l = end.length;
			max = parseInt(max, 10);
			if (isNaN(max) || (max < l))
				max = 0;
			var s = this.trim();
			if (s === '')
				return '';
			if (max <= l)
				return end;
			max = max - l;
			if (s.length <= max)
				return s;
			return s.substring(0, max).replace(/\s*$/, '') + end;
		}},

		// Sort & Order
		desc: { value: function () { return String.SortMode(this, true); }},
		asc: { value: function () { return String.SortMode(this, false); }}
	});

	Number.prototype.toHour = function () {
		return (this + '').toHour();
	};
})();

function $each(o, fn) {
	if (typeof fn !== 'function')
		return undefined; // Error
	for (var i in o)
		if (o.hasOwnProperty(i) && (fn.apply(o[i], [i, o[i]]) === false))
			return false; // Break
	return true; // All finish
}

var horariosUtils = {

	/*return [
		{
			hora: 8.20,
			localidad: { id: 1, text: 'Roca' },
			active: false,
			recorrido: [
				{ id: 1, text: 'Roca' },
				{ id: 2, text: 'Allen' },
				{ id: 3, text: 'Nqn' }
			]
		}
	];*/
	buscarHorarios: function (desde, hasta, dia, tipo) {
		var data = [],
			pqp = ($db.tipos.PRIMERO_QUE_PASA === tipo),
			localidadHasta = $db.localidades.get(hasta),
			fl, tl, fi, ti, fh, th, i, rr, hh;

		$each($db.horarios, function (x, horario) {
			if ((horario.dia === dia) && (pqp || (horario.tipo === tipo))) {
				fl = -1;
				tl = -1;
				fi = -1;
				ti = -1;
				i = 0;

				$each(horario.recorrido, function (x, recorrido) {
					if (desde === recorrido.localidad) {
						fl = desde;
						fh = recorrido.hora;
						fi = i;
					}

					if (hasta === recorrido.localidad) {
						tl = hasta;
						hh = th = recorrido.hora;
						ti = i;
					}

					if ((fi < ti) && (fl > -1) && (tl > -1)) { // From && To
						rr = [];
						$each(horario.recorrido, function (rri, rrv) {
							rr.push({
								localidad: $db.localidades.get(rrv.localidad).text,
								hora: rrv.hora,
								tipo: $db.tipos.get(horario.tipo).text
							});
						});

						data.push({
							hora: fh,
							localidad: $db.localidades.get(fl),
							active: false,
							recorrido: rr,
							destino: {
								hora: hh,
								localidad: localidadHasta
							},
							tipo: $db.tipos.get(horario.tipo)
						});

						return false;
					}

					i++;
				});
			}
		});

		if (data.length > 0)
			data.sortBy('hora');

		return data;
	},

	prepararHorarios: function (horarios) {
		var h, x, d, y;

		if (horarios.length === 0) {
			app.Alert("No existen horarios para este recorrido");
		} else {
			d = new Date();
			h = d.getHours() + (d.getMinutes() / 100);
			x = 999;

			$each(horarios, function (i, v) {
				d = v.hora - h;
				if (d < 0) d = (-1) * d;
				if (d < x) {
					x = d;
					y = i;
				}
			});

			horarios[y].active = true;
		}

		// Mostrar horarios
		return horarios;
	}
};