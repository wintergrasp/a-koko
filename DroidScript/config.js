// Config
this.CFG = {
	// Ver mensajes LOG
	debug: false,
	app: {
		title: 'A-KoKo',
		style: {
			text: {
				size: 20,
				size2: 16
			},
			title: {
				size: 30
			},
			backimg: '/Sys/Img/BlueBack.png',
			backimg2: '/Sys/Img/GreenBack.png'
		},
		horarios: {
			fecha: '01/02/2015' // Fecha de carga
		}
	},
	// Data
	data: {
		GetLocID: function (x) {
			return CFG.data.loc.indexOf(x);
		},
		GetDayID: function (x) {
			return CFG.data.days.indexOf(x);
		},
		GetTypeID: function (x) {
			return CFG.data.type.indexOf(x);
		}
	}
};

// Variables
this._layDetailVisible = false;
this._layAboutVisible = false;

// Selected
this.selected = {
	day: '',
	from: '',
	to: '',
	type: ''
};

// Layouts
this.layMain = null;
this.layDetail = null;

// Form
this.spinFrom = null;
this.spinTo = null;
this.spinDay = null;
this.spinType = null;

// Controls
this.lstHorarios = null;