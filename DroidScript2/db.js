var $db = {
	__init: function () {
		var i;
		for (i in $db) if ($db.hasOwnProperty(i) && ($db[i] instanceof Array)) {
			$db[i].get = function (id) {
				var i;
				for (i in this) if (this.hasOwnProperty(i) && (this[i].id === id))
					return this[i];
				return null;
			};
		}
	},

	dias: [/*
		{
			id: 1,
			text: 'Lunes a Viernes'
		}
	*/],
	localidades: [/*
		{
			id: 1,
			order: 1,
			text: 'Neuquen Terminal'
		}
	*/],
	tipos: [/*
		{
			id: 1,
			text: 'X 22'
		}
	*/],
	horarios: [/*
		{
			dia: 2,
			tipo: 3,
			recorrido: [
				{
					localidad: 2,
					hora: 8.30
				},
				{
					localidad: 3,
					hora: 9.00
				},
				{
					localidad: 4,
					hora: 10.45
				}
			]
		}
	*/]
};