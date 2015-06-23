/** ********* **
 *  Prototype  *
 ** ********* **/

String.prototype.toHour = function () {
	var x = this.replace('.', ':')
		.replace(/^(\d+)$/, '$1:00')
		.replace(/:(\d)$/, ':$10');
	if (x.length === 4)
		x = '0' + x;
	return x;
};

Number.prototype.toHour = function () {
	return (this + '').toHour();
};

String.prototype.cut = function (max, end /*'...'*/) {
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
};