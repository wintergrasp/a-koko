/** ********* **
 *  PROTOTYPE  * 
 ** ********* **/

String.prototype.toHour = function () {
	var x = this.replace('.', ':')
		.replace(/^(\d+)$/, '$1:00')
		.replace(/:(\d)$/, ':$10');
	if (x.length === 4)
		x = '0' + x;
	return x;
};

Number.prototype.toHour = function () {
	return (this + '').toHour();
};

$$.Utils = {
	DetailIsVisible: function () {
		return _layDetailVisible;
	},
	
	AboutIsVisible: function () {
		return _layAboutVisible;
	},
	
	Locations: {
		/**
		 * lst: {
		 *  7.10: 0,
		 *  7.25: 1,
		 *  7.35: 2,
		 *  7.50: 3
		 * }
		 */
		ListToString: function (lst) {
			var i, s = '';
			for (i in lst) if (lst.hasOwnProperty(i)) {
				if (s) s += ' - ';
				s += CFG.data.loc[lst[i]];
			}
			return s;
		}
	},
	
	Hour: {
		ToString: function (/*array*/h) {
			return h.join(',').replace(/\./g, ':')
				.replace(/^(\d+),/, '$1:00,')
				.replace(/:(\d)$/, ':$10')
				.replace(/,(\d)$/, ',$1:00')
				.replace(/,(\d{2})$/g, ',$1:00')
				.replace(/:(\d),/g, ':$10,')
				.replace(/,(\d),/, ',$1:00,');
		}
	},
	
	List: {
		Escape: function (txt) {
			return ((txt || '') + '')
				.replace(/:/g, '^c^')
				.replace(/,/g, '? '); //NOTA: La "," es un caracter "especial", y hace que esta linea se rompa
		},
		
		Set: function (lst, data) {
			/*
			data = [
				{
					// Required
					title: 'Foo',
					// Optional
					body: 'Bar',
					// Optional
					extra: 'Extra...',
					// Optional
					icon: null|folder|audiofolder|photofolder|videofolder|audio|photo|video|playlist
				},
				...
			]
			*/
			var s = '';
			
			if (data && data.length) {
				for (var i in data) if (data.hasOwnProperty(i)) {
					if (s) s += ',';
					var d = data[i];
					s += this.Escape(d.title || i);
					if (d.body)
						s += ':' + this.Escape(d.body);
					if (d.extra)
						s += ':' + this.Escape(d.extra);
					s += ':' + (d.icon || 'null');
				}
			}
		 
			//if (CFG.debug) app.ShowPopup(s);   
			lst.SetList(s);
		}
	},
	
	Horario: {
		Get: function (typeId, dayId) {
			return include('horarios.' + typeId + '.' + dayId);
		},
		
		Find: function (from, to, day, type) {
			var data   = [],
				fromId = CFG.data.GetLocID(from),
				toId   = CFG.data.GetLocID(to),
				dayId  = CFG.data.GetDayID(day),
				typeId = CFG.data.GetTypeID(type),
				hrs  = this.Get(typeId, dayId),
				fl, tl, fi, ti, hr, hora, horas, locId, fh, th, i;
			
			hrs.each(function (hr, horas) {
				fl = -1;
				tl = -1;
				fi = -1;
				ti = -1;
				i = 0;
				
				horas.each(function (hora, locId) {
					if (fromId === locId) {
						fl = fromId;
						fh = parseFloat(hora);
						fi = i;
					}
					if (toId === locId) {
						tl = toId;
						th = parseFloat(hora);
						ti = i;
					}
					if ((fi < ti) && (fl > -1) && (tl > -1)) { // From && To
						if (fh < th) { // From < To
							data.push({
								title: '%0 | %1'
									.format(fh.toHour(), CFG.data.loc[fl]),
								body: '%0 | %1'
									.format(th.toHour(), CFG.data.loc[tl]),
								extra: Utils.Locations.ListToString(horas)
							});
						}
						return false;
					}
					i++;
				});
			});
			
			data.sortBy('title');
			
			return data;
		}
	},
	
	Controls: {
		CreateTitle: function (str) {
			var txt = app.CreateText(str);
			txt.SetTextSize(CFG.app.style.title.size);
			return txt;
		},
		
		CreateLabel: function (str) {
			var txt = app.CreateText(str, 0.3, null, "Right");
			txt.SetTextSize(CFG.app.style.text.size);
			return txt;
		},
		
		CreateText: function (str) {
			var txt = app.CreateText(str, 1, null, "Left" );
			txt.SetTextSize(CFG.app.style.text.size);
			return txt;
		},
		
		CreateButton: function (str, onTouch) {
			var btn = app.CreateButton(str, 0.8, 0.06);//, "gray");
			btn.SetOnTouch(onTouch);
			btn.SetTextSize(CFG.app.style.text.size);
			return btn;
		},
		
		CreateSpinner: function (key, data) {
			var rows = data.join(',');
			selected[key] = app.LoadText('Form_' + key, data[0]);
			//selected[key] = data[0];
			
			var spin = app.CreateSpinner(rows, 0.8);
			spin.SetTextSize(CFG.app.style.text.size);
			spin.SelectItem(selected[key]);
			//spin.SetBackColor('#555555');
			return spin;
		}
	}
};
