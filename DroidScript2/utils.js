/** ********* **
 *  Prototype  *
 ** ********* **/
(function () {
	function SortMode(col, desc) {
		if (this instanceof String.SortMode) {
			this.value = col.valueOf(col);
			this.desc = desc;
			this.asc = !desc;

			this.toString = function () { return this.value; };
		} else {
			return new String.SortMode(col, desc);
		}
	}

	Object.defineProperties(Array.prototype, {
		contains: { value: function (x) { return this.indexOf(x) > -1; } },
		sortBy: {
			value: function (col) {
				if (arguments.length > 1) {
					var i;
					for (i = arguments.length - 1; i >= 0; i--)
						this.sortBy(arguments[i]);
				} else {
					if (col instanceof SortMode) {
						if (col.desc) {
							// DESC
							col = col.value;
							this.sort(function (a, b) {
								if (a[col] < b[col])
									return 1;
								if (a[col] > b[col])
									return -1;
								return 0;
							});
						} else {
							// ASC
							col = col.value;
							this.sort(function (a, b) {
								if (a[col] < b[col])
									return -1;
								if (a[col] > b[col])
									return 1;
								return 0;
							});
						}
					} else {
						this.sortBy(col.asc);
					}
				}

				return this;
			}
		}
	});

	Object.defineProperties(String.prototype, {
		toHour: { value: function () {
			var x = this.replace('.', ':')
				.replace(/^(\d+)$/, '$1:00')
				.replace(/:(\d)$/, ':$10');
			if (x.length === 4)
				x = '0' + x;
			return x;
		}},

		// Repeat
		repeat: { value: function (n) {
			n = parseInt(n, 10);
			if (isNaN(n) || n < 0)
				return null;
			return new Array(n + 1).join(this);
		}},

		// Contains
		contains: { value: function (x) { return this.indexOf(x) > -1; }},

		// Format String
		format: { value: function () {
			var s = this, i;
			for (i = 0; i < arguments.length; i++)
				s = s.replace("%" + i, arguments[i]);
			return s;
		}},

		// Cut and add "..." to the end
		cut: { value: function (max, end /*'...'*/) {
			if (end)
				end = end.toString().trim();
			if (!end)
				end = '...';
			var l = end.length;
			max = parseInt(max, 10);
			if (isNaN(max) || (max < l))
				max = 0;
			var s = this.trim();
			if (s === '')
				return '';
			if (max <= l)
				return end;
			max = max - l;
			if (s.length <= max)
				return s;
			return s.substring(0, max).replace(/\s*$/, '') + end;
		}},

		// Sort & Order
		desc: { value: function () { return String.SortMode(this, true); }},
		asc: { value: function () { return String.SortMode(this, false); }}
	});

	String.SortMode = SortMode;

	Number.prototype.toHour = function () {
		return (this + '').toHour();
	};
})();

function $each(o, fn) {
	if (typeof fn !== 'function')
		return undefined; // Error
	for (var i in o)
		if (o.hasOwnProperty(i) && (fn.apply(o[i], [i, o[i]]) === false))
			return false; // Break
	return true; // All finish
}