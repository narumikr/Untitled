/* eslint-disable no-console */
var isDevelopment = function isDevelopment() {
  return typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
};
var ConsoleWarning = function ConsoleWarning() {
  if (isDevelopment()) {
    var _console2;
    (_console2 = console).warn.apply(_console2, arguments);
  }
};
var ConsoleError = function ConsoleError() {
  if (isDevelopment()) {
    var _console3;
    (_console3 = console).error.apply(_console3, arguments);
  }
};

export { ConsoleError, ConsoleWarning };
