const $db = require('./load_db');
const Utils = require('./utils');

function ParserHelper() {}

/**
 * Get Tipo ID from Sheet Name.
 * 
 * @param {String} sheet_name Sheet Name.
 * @return {Number} $db.tipo.id
 */
ParserHelper.getTipoId = sheet_name => {
  sheet_name = sheet_name.toLowerCase();

  for (let $db_tipo of $db.tipos) {
    if ($db_tipo.convert) {
      // Buscar tipo
      for (let $db_tipo_convert of $db_tipo.convert) {
        if (sheet_name.indexOf($db_tipo_convert) > -1) {
          // Tipo encontrado
          return $db_tipo.id;
        }
      }
    }
  }

  // Tipo: Comun
  return $db.tipos.COMUN;
};
