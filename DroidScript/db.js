var $db = {
	dias: [],
	localidades: [],
	tipos: [],
	horarios: []
};

Object.defineProperty($db, '__init', {
	value: function () {
		var i;
		for (i in $db) if ($db.hasOwnProperty(i) && ($db[i] instanceof Array)) {
			Object.defineProperty($db[i], 'get', {
				value: function (id) {
					var i;
					for (i in this) if (this.hasOwnProperty(i) && (this[i].id === id))
						return this[i];
					return null;
				},
				enumerable: false
			});
		}
	},
	enumerable: false
});