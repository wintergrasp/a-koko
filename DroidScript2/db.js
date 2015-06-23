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
	}
};