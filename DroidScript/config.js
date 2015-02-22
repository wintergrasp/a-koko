// Config
this.CFG = {
    // Ver mensajes LOG
    debug: false,
    app: {
    	title: 'A-KoKo',
    	style: {
    		text: {
    			size: 22
    		},
    		title: {
    			size: 30
    		},
    		backcolor: '#000000'
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