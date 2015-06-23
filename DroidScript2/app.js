function MainController() { return angular.element($('#MainController')).scope(); }
function Menu() { $('#main-menu').click(); }
Menu.isVisible = function () { return $('#sidenav-overlay').length > 0; };

(function () {
	$db.__init();

	var __selected = { isSelected: false },
		__horarios = [];

	/*function buscarHorarios() {
		var data   = [],
			fromId = __selected.desde,
			toId   = __selected.hasta,
			dayId  = __selected.dia,
			typeId = __selected.tipo,
			hrs  = getHorasFromTipo(),
			fl, tl, fi, ti, hr, hora, horas, locId, fh, th, i;

		$each(hrs, function (hr, horas) {
			fl = -1;
			tl = -1;
			fi = -1;
			ti = -1;
			i = 0;

			$each(horas, function (hora, locId) {
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
					data.push({
						hora: fh,
						localidad: fl,
						active: '',
						recorrido: []
					});

					return false;
				}

				i++;
			});
		});

		data.sortBy('hora');

		return data;
	}*/

	function prepararHorarios() {
		var horarios, h, x, d, y;

		//horarios = buscarHorarios();
		horarios = [
			{
				hora: 8.20,
				localidad: { id: 1, text: 'Roca' },
				active: false,
				recorrido: [
					{ id: 1, text: 'Roca' },
					{ id: 2, text: 'Allen' },
					{ id: 3, text: 'Nqn' }
				]
			},
			{
				hora: 8.30,
				localidad: { id: 1, text: 'Roca' },
				active: true,
				recorrido: [
					{ id: 1, text: 'Roca' },
					{ id: 2, text: 'Allen' },
					{ id: 3, text: 'Nqn' }
				]
			},
			{
				hora: 8.40,
				localidad: { id: 1, text: 'Roca' },
				active: false,
				recorrido: [
					{ id: 1, text: 'Roca' },
					{ id: 2, text: 'Allen' },
					{ id: 3, text: 'Nqn' }
				]
			},
			{
				hora: 8.50,
				localidad: { id: 1, text: 'Roca' },
				active: false,
				recorrido: [
					{ id: 1, text: 'Roca' },
					{ id: 2, text: 'Allen' },
					{ id: 3, text: 'Nqn' }
				]
			}
		];

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

			horarios[y].active = 'active';
		}

		// Mostrar horarios
		return horarios;
	}

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

			$scope.isPageVisible = function (x) {
				if (x === 'horarios') {
					return __selected.isSelected;
				} else {
					return true;
				}
			};

			$(function () {
				$('.button-collapse').sideNav();
			})
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
						, isSelected: true
					};

					// Save selection
					app.SaveNumber("Form_desde", __selected.desde);
					app.SaveNumber("Form_hasta__", __selected.hasta);
					app.SaveNumber("Form_dia__", __selected.dia);
					app.SaveNumber('Form_tipo__', __selected.tipo);

					__horarios = prepararHorarios($scope);
					$scope.$parent.setPage('horarios');
				}
			};
		}])

		.controller('HorariosController', ['$scope', function ($scope) {
			$scope.getTitulo = function () {
				if (!__selected.isSelected)
					return '';
				return $db.tipos.get(__selected.tipo).text + ' | ' + $db.dias.get(__selected.dia).text;
			};

			Object.defineProperty($scope, 'horarios', {
				get: function () { return __horarios; },
				set: function (v) { __horarios = v; }
			});
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