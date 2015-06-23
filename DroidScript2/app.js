function MainController() { return angular.element($('#MainController')).scope(); }
function Menu() { $('#main-menu').click(); }
Menu.isVisible = function () { return $('#sidenav-overlay').length > 0; };

var selected = {};

(function () {
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

			$scope.formData.desde = app.LoadNumber('Form_desde');
			$scope.formData.hasta = app.LoadNumber('Form_hasta');
			$scope.formData.dia = app.LoadNumber('Form_dia', $db.dias[0].id);
			$scope.formData.tipo = app.LoadNumber('Form_tipo', $db.tipos[0].id);

			$scope.verHorarios = function () {
				if ($scope.formData.desde === $scope.formData.hasta) {
					app.ShowPopup('El origen y el destino son el mismo');
				} else {
					selected = {
						  desde: $scope.formData.desde
						, hasta: $scope.formData.hasta
						, dia: $scope.formData.dia
						, tipo: $scope.formData.tipo
					};

					// Save selection
					app.SaveNumber("Form_desde", selected.desde);
					app.SaveNumber("Form_hasta", selected.hasta);
					app.SaveNumber("Form_dia", selected.dia);
					app.SaveNumber('Form_tipo', selected.tipo);

					$scope.$parent.setPage('horarios');
				}
			};
		}])

		.controller('HorariosController', ['$scope', function ($scope) {
			$scope.horarios = [];

			/*
			// Go to current time
			var data, s, h, x, d, y, t;
			
			data = Utils.Horario.Find(selected.desde,
				selected.hasta, selected.dia, selected.tipo);
			
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
				$scope.titulo = (selected.tipo.cut(10) + ' | ' + selected.dia.cut(15));
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