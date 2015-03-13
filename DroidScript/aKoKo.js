/**
 * A-KoKo
 * Copyright (c) 2015 A-KoKo | Eduardo Daniel Cuomo | eduardo.cuomo.ar@gmail.com
 */

app.SetOrientation("Portrait");

/** **** **
 *  CORE  *
 ** **** **/

eval(app.ReadFile(app.GetAppPath() + "/xprototype.js"));
eval(app.ReadFile(app.GetAppPath() + "/$.js"));

/** ************** **
 *  LOAD RESOURCES  *
 ** ************** **/
 
include("config");
 
include("localidades");
include("tipos");
include("dias");

include("utils");

/** ****** **
 *  EVENTS  *
 ** ****** **/

function OnStart() {
	// Init
	/*var layMain = new Layout({
		id: 'layMain',
		setBackcolor: CFG.app.style.backcolor
	});*/
	
	InitLayMain();
	
	InitLayAbout();
	InitLayDetail();
	
	// Build
	BuildLayMain();
	BuildLayAbout();
	BuildLayDetail();
	
	// Config
	app.EnableBackKey(false);
	app.SetOrientation("Portrait");
	
	// Add layouts to APP
	app.AddLayout(layMain);
	app.AddLayout(layAbout);
	app.AddLayout(layDetail);
}

function OnBack() {
	if (Utils.DetailIsVisible()) {
		DetailHide();
	} else if (Utils.AboutIsVisible()) {
		AboutHide();
	} else {
		app.Exit();
	}
}

/** *********** **
 *  Layout Main  *
 ** *********** **/

function InitLayMain() {
	layMain = app.CreateLayout("Linear", "FillXY");
	layMain.SetBackground(CFG.app.style.backimg);
}

function BuildLayMain() {
	AddLayTitle(layMain);
	InitFrom();
	InitTo();
	InitDay();
	InitTipo();
	InitBtnVerHorarios();
	InitBtnVerAbout();
}

function AddLayTitle(lay) {
	lay.AddChild(Utils.Controls.CreateTitle(CFG.app.title));
}

function InitFrom() {
	var lay = app.CreateLayout("Linear", "Horizontal");
	lay.SetMargins(0, 0.005, 0.005, 0);
	layMain.AddChild(lay);
	
	lay.AddChild(Utils.Controls.CreateLabel("Desde:"));
	
	spinFrom = Utils.Controls.CreateSpinner("from", CFG.data.loc);
	lay.AddChild(spinFrom);
}

function InitTo() {
	var lay = app.CreateLayout("Linear", "Horizontal");
	lay.SetMargins(0, 0.005, 0.005, 0);
	layMain.AddChild(lay);
	
	lay.AddChild(Utils.Controls.CreateLabel("Hasta:"));
	
	spinTo = Utils.Controls.CreateSpinner("to", CFG.data.loc);
	lay.AddChild(spinTo);
}

function InitDay() {
	var lay = app.CreateLayout("Linear", "Horizontal");
	lay.SetMargins(0, 0.005, 0.005, 0);
	layMain.AddChild(lay);
	
	lay.AddChild(Utils.Controls.CreateLabel("Día:"));
	
	spinDay = Utils.Controls.CreateSpinner("day", CFG.data.days);
	lay.AddChild(spinDay);
}

function InitTipo() {
	var lay = app.CreateLayout("Linear", "Horizontal");
	lay.SetMargins(0, 0.005, 0.005, 0);
	layMain.AddChild(lay);
	
	lay.AddChild(Utils.Controls.CreateLabel("Tipo:"));
	
	spinType = Utils.Controls.CreateSpinner("type", CFG.data.type);
	lay.AddChild(spinType);
}

function InitBtnVerHorarios() {
	var b = Utils.Controls.CreateButton(
		"Ver Horarios", DetailShow);
	layMain.AddChild(b);
	b.SetMargins(0, 0.1, 0, 0);
}

function InitBtnVerAbout() {
	layMain.AddChild(Utils.Controls.CreateButton(
		"Acerca de...", AboutShow));
}

/** ************ **
 *  Layout About  *
 ** ************ **/

function InitLayAbout() {
	layAbout = app.CreateLayout("Linear", "FillXY");
	layAbout.SetBackground(CFG.app.style.backimg2);
	layAbout.SetVisibility("Hide");
}

function BuildLayAbout() {
	AddLayTitle(layAbout);
	layAbout.AddChild(Utils.Controls.CreateTitle('v' + app.GetVersion()));
	layAbout.AddChild(Utils.Controls.CreateText(""));
	layAbout.AddChild(Utils.Controls.CreateText("Creado por:"));
	layAbout.AddChild(Utils.Controls.CreateText("Eduardo Daniel Cuomo", CFG.app.style.text.size2));
	layAbout.AddChild(Utils.Controls.CreateText(""));
	layAbout.AddChild(Utils.Controls.CreateText("Fecha carga horarios:"));
	layAbout.AddChild(Utils.Controls.CreateText(CFG.app.horarios.fecha, CFG.app.style.text.size2));
	layAbout.AddChild(Utils.Controls.CreateText(""));
	layAbout.AddChild(Utils.Controls.CreateText("Contacto:"));
	layAbout.AddChild(Utils.Controls.CreateText("eduardo.cuomo.ar+akoko@gmail.com", CFG.app.style.text.size2, SendMail));
	layAbout.AddChild(Utils.Controls.CreateText(""));
	layAbout.AddChild(Utils.Controls.CreateButton("Regresar", AboutHide));
}

function SendMail() {
    app.SendMail(
        "eduardo.cuomo.ar+akoko@gmail.com", // e-Mail
        "Consulta a-KoKo (v" + app.GetVersion() + ")", // Title
        "Eduardo:\n\t"//, // Message
        //file // File
    );
}

/** ************* **
 *  Layout Detail  *
 ** ************* **/

function InitLayDetail() {
	layDetail = app.CreateLayout("Linear", "FillXY");
	layDetail.SetBackground(CFG.app.style.backimg2);
	layDetail.SetVisibility("Hide");
}

function BuildLayDetail() {
	AddLayTitle(layDetail);
	InitTitle();
	InitHorarios();
	InitBtnRegresar();
}

function InitTitle() {
	//txtDetailTitle = Utils.Controls.CreateTitle(CFG.app.title);
	txtDetailTitle = app.CreateText('');
	txtDetailTitle.SetTextSize(CFG.app.style.text.size + 3);
	layDetail.AddChild(txtDetailTitle);
}

function InitHorarios() {
	lstHorarios = app.CreateList("", 1, 0.7);
	lstHorarios.SetMargins(0, 0.03, 0, 0.03);
	layDetail.AddChild(lstHorarios);
}

function InitBtnRegresar() {
	layDetail.AddChild(Utils.Controls.CreateButton(
		"Regresar", DetailHide));
}

/** ******* **
 *  ACTIONS  *
 ** ******* **/

function DetailShow() {
	// Read Selection
	selected.from = spinFrom.GetText();
	selected.to = spinTo.GetText();
	selected.day = spinDay.GetText();
	selected.type = spinType.GetText();
	
	if (selected.from === selected.to) {
		app.ShowPopup('El origen y el destino son el mismo');
	} else {
		// Save selection
		app.SaveText("Form_from", selected.from);
		app.SaveText("Form_to", selected.to);
		app.SaveText("Form_day", selected.day);
		app.SaveText('Form_type', selected.type);
		
		// Go to current time
		var data, s, h, x, d, y, t;
		
		data = Utils.Horario.Find(selected.from,
			selected.to, selected.day, selected.type);
		
		if (data.length === 0) {
			app.Alert("No existen horarios para este recorrido");
		} else {
			// Details Visible
			_layDetailVisible = true;
			
			Utils.List.Set(lstHorarios, data);
			
			d = new Date();
			h = d.getHours() + (d.getMinutes() / 100);
			d = x = 999;
	
			data.each(function (i, v) {
				t = v.title;
				s = parseFloat(t.split('|')[0].trim().replace(':', '.'));
				d = s - h;
				if (d < 0) d = (-1) * d;
				if (d < x) {
					x = d;
					y = t;
				}
			});
	
			lstHorarios.ScrollToItem(y);
			
			// Detail Title
			txtDetailTitle.SetText(selected.type.cut(10) + ' | ' + selected.day.cut(15));
			
			// Show Detail
			layDetail.Animate("SlideFromLeft");
		}
	}
}

function AboutShow() {
	// Details Visible
	_layAboutVisible = true;
	
	// Show Detail
	layAbout.Animate("SlideFromLeft");
}

function DetailHide() {
	_layDetailVisible = false;
	layDetail.Animate("SlideToLeft");
}

function AboutHide() {
	_layAboutVisible = false;
	layAbout.Animate("SlideToLeft");
}
