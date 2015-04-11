'use strict';

module.exports = function (moduleName) {
  return function (value) {
    console.log(moduleName + ': ' + value);
  };
};
