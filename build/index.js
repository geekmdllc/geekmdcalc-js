'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ascvdFramingham = function ascvdFramingham(data) {
  throw new Error('ascvdFramingham is not yet implemented.');
};

var ascvdPooled = function ascvdPooled(data) {
  throw new Error('ascvdPooled is not yet implemented.');
};

var ascvd = function ascvd(data) {
  switch (data.type.toLowerCase()) {
    case 'framingham':
      return ascvdFramingham();

    case 'pooled13':
      return ascvdPooled();

    default:
      throw new Error('ascvd has not been implemented.');
  }
};

exports.ascvd = ascvd;
