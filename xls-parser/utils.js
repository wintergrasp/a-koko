function Utils() {}

/**
 * @return String|null
 */
Utils.toHour = (n) => {
  if (!n) return null;
  n = (n + '').replace(/[^\d\.:,;]/g, '');
  if (!n) return null;

  n = n.replace(/(\d+.\d+)/, '$1');

  if (/\d+.\d+/.test(n)) {
    n = n.replace(/(\d+).(\d+)/, '$1:$2');
  } else if (/^\d+$/.test(n)) {
    n = n.replace(/^(\d+)$/, '$1:00');
  } else {
    return null;
  }

  n = n.replace(/:(\d)$/, ':$10');

  if (n.length === 4) {
    n = '0' + n;
  }

  return n;
};

module.exports = Utils;