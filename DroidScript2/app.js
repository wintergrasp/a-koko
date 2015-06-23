var $db = {
	ciudades: [
		  { id:  1, order:  1, text: 'Allen' }
		, { id:  2, order:  2, text: 'Gral. Roca' }
	],
	dias: [
		  { id:  1, order:  1, text: 'Lunes a Viernes' }
		, { id:  2, order:  2, text: 'Sabado' }
		, { id:  3, order:  3, text: 'Domingo & Feriado' }
	],
	tipos: [
		  { id:  1, order:  1, text: 'Comun' }
		, { id:  2, order:  2, text: 'X 22' }
		, { id:  3, order:  3, text: 'Expreso' }
		, { id:  4, order:  4, text: 'Directo' }
	]
};

var $cfg = {
	email: 'eduardo.cuomo.ar+akoko@gmail.com'
};

if (this.app) {
	app.EnableBackKey(false);
} else {
	this.app = {
		  isHtml: true
		, GetVersion: function () {
			return '2.0';
		  }

		, SendMail: function (email, subject, message, file) {
			window.location.href =
				"mailto:" + email
				//+ "?cc=myCCaddress@example.com"
				+ "?subject=" + escape(subject)
				+ "&body=" + escape(message)
			;
		}

		, Exit: function () {
			window.close();
		}
	};
}

function MainController() { return angular.element($('#MainController')).scope(); }
function Menu() { $('#main-menu').click(); }
Menu.isVisible = function () { return $('#sidenav-overlay').length > 0; };

(function () {
	var selected = {};

	angular
		.module('akoko', [])

		.controller('MainController', ['$scope', function ($scope) {
			$scope.menuOptions = [
				  { key: 'form',		icon: 'mdi-action-search',			text: 'Buscar' }
				, { key: 'horarios',	icon: 'mdi-device-access-time',		text: 'Horarios' }
				, { key: 'about',		icon: 'mdi-action-info-outline',	text: 'Acerca de' }
			];

			if (!app.isHtml) {
				$scope.menuOptions.push({
					  key: 'exit'
					, icon: 'mdi-action-exit-to-app'
					, text: 'Salir'
				});
			}

			$scope.currentPage = $scope.menuOptions[0].key;

			$scope.hideNav = function () {
				$('.button-collapse').sideNav('hide');
			};

			$scope.setPage = function (x) {
				if (x === 'exit') {
					app.Exit();
				} else {
					$scope.currentPage = x;
					$scope.hideNav();
				}
			};

			$scope.isPage = function (x) {
				return $scope.currentPage === x;
			};

			$(function () {
				$('.button-collapse').sideNav();
			})
		}])

		.controller('FormController', ['$scope', function ($scope) {
			$scope.db = $db;
			$scope.formData = {};
			selected = {};

			$scope.verHorarios = function () {
				selected = {
					  desde: $scope.formData.desde
					, hasta: $scope.formData.hasta
					, dia: $scope.formData.dia
					, tipo: $scope.formData.tipo
				};
				$scope.$parent.setPage('horarios');
			};

			$scope.formData.dia = $db.dias[0].id;
			$scope.formData.tipo = $db.tipos[0].id;
		}])

		.controller('HorariosController', ['$scope', function ($scope) {
			$scope.horarios = [
				  'Test 1'
				, 'Test 2'
			];

			/*
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
			*/
		}])

		.controller('AboutController', ['$scope', function ($scope) {
			var version = 'v' + app.GetVersion()
			$scope.txtVersion = version;
			$scope.txtEmail = $cfg.email;

			$scope.doSendMail = function () {
				app.SendMail(
					$cfg.email, // e-Mail
					"Consulta a-KoKo (" + version + ")", // Title
					"Eduardo:\n\t"//, // Message
					//file // File
				);
			};
		}])
	;
})();

var backClick = 0,
	backClickTO;

function OnBack() {
	var scope = MainController();
	scope.$apply(function () {
		if (scope.isPage('form')) {
			app.Exit();
		} else {
			if (Menu.isVisible()) {
				Menu();
			} else {
				scope.setPage('form');
			}
		}
	});
}

function OnMenu(item) {
	//app.ShowPopup( item, "Short" );
	Menu();
}