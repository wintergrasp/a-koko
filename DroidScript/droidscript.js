if (this.app) {
	app.EnableBackKey(false);
} else {
	this.app = {
		  isHtml: true

		, GetVersion: function () {
			return '2.52';
		}

		, SendMail: function (email, subject, message, file) {
			window.location.href =
				"mailto:" + email
				//+ "?cc=myCCaddress@example.com"
				+ "?subject=" + escape(subject)
				+ "&body=" + escape(message)
			;
		}

		, OpenUrl: function (url) {
			window.open(url);
		}

		, Exit: function () {
			window.close();
		}

		, Alert: function (m, t) {
			if (t) m = t + '\n\t' + m;
			alert(m);
		}

		, ShowPopup: function (m) {
			Materialize.toast(m, 5000);
			// alert(m);
		}

		, SaveText: function (k, v) {
			if (typeof(Storage) !== "undefined")
				localStorage.setItem(k, v || null);
		}

		, LoadText: function (k, def) {
			if ((typeof(Storage) !== "undefined") && localStorage.hasOwnProperty(k))
				return localStorage.getItem(k) || def || null;

			return def || null;
		}

		, SaveNumber: function (k, v) {
			app.SaveText(k, v);
		}

		, LoadNumber: function (k, def) {
			return parseInt(app.LoadText(k, def), 10);
		}

		, GetOSVersion: function () {
			return navigator.appVersion;
		}

		, GetModel: function () {
			return navigator.userAgent;
		},

		ShowProgressBar: function (msg, p) {
			var m = $('#modalLoading');
			m.find('p').text(msg);
			m.find('.determinate').css('width', p + '%')
			m.openModal({
				dismissible: false
			});
		},

		UpdateProgressBar: function (p) {
			$('#modalLoading .determinate').css('width', p + '%');
		},

		HideProgressBar: function () {
			$('#modalLoading').closeModal();
		}
	};
}

var backClick = 0,
	backClickTO;

function OnBack() {
	var scope = MainController();
	scope.$apply(function () {
		if (Menu.isVisible()) {
			Menu();
		} else {
			if (scope.isPage('')) {
				app.Exit();
			} else {
				scope.setPage('');
			}
		}
	});
}

function OnMenu(item) {
	Menu();
}