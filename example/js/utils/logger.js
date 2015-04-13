'use strict';

module.exports = function (moduleName, color) {
  color = color || '#333333';

  return function (value) {
    console.log('%c' + moduleName + ': ' + value, 'color: ' + color);
  };
};
