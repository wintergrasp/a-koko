function MainController() { return angular.element($('#MainController')).scope(); }
function Menu() { $('#main-menu').click(); }
Menu.isVisible = function () { return $('#sidenav-overlay').length > 0; };

(function () {
	$db.__init();

	var __selected = { isSelected: false },
		__horarios = [];

	angular
		.module('akoko', ['ngRoute'])

		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl	: 'Html/form.html',
					controller 	: 'MainController'
				})
				.when('/horarios', {
					templateUrl : 'Html/horarios.html',
					controller 	: 'HorariosController'
				})
				.when('/about', {
					templateUrl : 'Html/about.html',
					controller 	: 'AboutController'
				})
				.otherwise({
					redirectTo: '/'
				});
		}])

		.controller('MainController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
			var aboutMenu = {
				  key: 'about'
				, icon: 'mdi-action-info-outline'
				, text: 'Acerca de'
			};

			$scope.$location = $location;

			$scope.menuOptions = [
				  {
					  key: ''
					, icon: 'mdi-action-search'
					, text: 'Buscar'
				  }
				, {
					  key: 'horarios'
					, icon: 'mdi-device-access-time'
					, text: 'Horarios'
				  }
			];

			if (app.isHtml) {
				$scope.menuOptions.push({
					  key: 'playStore'
					, icon: 'mdi-action-android'
					, text: 'Google Play'
				});
				$scope.menuOptions.push(aboutMenu);
			} else {
				$scope.menuOptions.push(aboutMenu);
				$scope.menuOptions.push({
					  key: 'exit'
					, icon: 'mdi-action-exit-to-app'
					, text: 'Salir'
				});
			}

			$scope.hideNav = function () {
				$('.button-collapse').sideNav('hide');
			};

			$scope.setPage = function (x) {
				switch (x) {
					case 'exit':
						app.Exit();
						break;
					case 'playStore':
						window.open($cfg.playStore);
						break;
					default:
						window.location = '#/' + x;
						break;
				}
			};

			$scope.isPage = function (x) {
				return $location.path() === '/' + x;
			};

			$scope.isPageVisible = function (x) {
				if (x === 'horarios') {
					return __selected.isSelected;
				} else {
					return true;
				}
			};

			$rootScope.$on("$routeChangeSuccess", function (event, current, previous) { 
				$scope.hideNav();
			});
		}])

		.controller('FormController', ['$scope', function ($scope) {
			$scope.db = $db;
			$scope.formData = {};
			__selected = { isSelected: false };

			$scope.formData.desde = app.LoadNumber('Form_desde');
			$scope.formData.hasta = app.LoadNumber('Form_hasta');
			$scope.formData.dia = app.LoadNumber('Form_dia', $db.dias[0].id);
			$scope.formData.tipo = app.LoadNumber('Form_tipo', $db.tipos[0].id);

			$scope.verHorarios = function () {
				if ($scope.formData.desde === $scope.formData.hasta) {
					app.ShowPopup('El origen y el destino son el mismo');
				} else {
					__selected = {
						  desde: $scope.formData.desde
						, hasta: $scope.formData.hasta
						, dia: $scope.formData.dia
						, tipo: $scope.formData.tipo
						, isSelected: false
					};

					// Save selection
					app.SaveNumber("Form_desde", __selected.desde);
					app.SaveNumber("Form_hasta", __selected.hasta);
					app.SaveNumber("Form_dia", __selected.dia);
					app.SaveNumber('Form_tipo', __selected.tipo);

					var hrs = horariosUtils.buscarHorarios(__selected.desde, __selected.hasta, __selected.dia, __selected.tipo);
					__horarios = horariosUtils.prepararHorarios(hrs);

					if (__horarios.length > 0) {
						__selected.isSelected = true;
						$scope.$parent.setPage('horarios');
					}
				}
			};
		}])

		.controller('HorariosController', ['$scope', function ($scope) {
			$scope.getTitulo = function () {
				if (!__selected.isSelected)
					return '';
				return $db.tipos.get(__selected.tipo).text + ' | ' + $db.dias.get(__selected.dia).text;
			};

			$scope.isPrimeroQuePasa = function () {
				if (!__selected.isSelected)
					return false;
				return __selected.tipo === $db.tipos.PRIMERO_QUE_PASA;
			}

			$scope.showRecorridoInfo = function (recorrido) {
				app.Alert('Pasa por: ' + recorrido.localidad + '\nHora: ' + recorrido.hora.toHour() + '\nTipo: ' + recorrido.tipo);
			};

			Object.defineProperty($scope, 'horarios', {
				get: function () { return __horarios; },
				set: function (v) { __horarios = v; }
			});
		}])

		.controller('AboutController', ['$scope', function ($scope) {
			var version = 'v' + app.GetVersion()
				message = 'OS: ' + app.GetOSVersion() + '. Model: ' +  app.GetModel() +
					'\n\nEduardo:\n\t';

			$scope.txtVersion = version;
			$scope.txtEmail = $cfg.email;

			$scope.doSendMail = function () {
				app.SendMail(
					$cfg.email, // e-Mail
					"Consulta a-KoKo (" + version + ")", // Title
					message//, // Message
					//file // File
				);
			};

			$scope.doShare = function () {
				app.ShowPopup('El Link se ha copiado al portapapeles');
				app.SetClipboardText($cfg.webApp);
			};
		}])
	;
})();

$(function () {
	$('.button-collapse').sideNav();
});