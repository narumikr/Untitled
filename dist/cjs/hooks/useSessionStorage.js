'use client';
'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var logging = require('../internal/logging.js');

var useSessionStorage = function useSessionStorage(sessionStorageKey, initialValue) {
  var _useState = React.useState(initialValue),
    _useState2 = _slicedToArray(_useState, 2),
    storedValue = _useState2[0],
    setStoredValue = _useState2[1];
  var isInitialized = React.useRef(false);
  React.useEffect(function () {
    if (isInitialized.current) return;
    isInitialized.current = true;
    try {
      var items = sessionStorage.getItem(sessionStorageKey);
      if (items) {
        setStoredValue(JSON.parse(items));
      }
    } catch (err) {
      logging.ConsoleError('Failed to get session storage value : ', err);
    }
  }, [initialValue, sessionStorageKey]);
  React.useEffect(function () {
    if (!isInitialized.current) return;
    try {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(storedValue));
    } catch (err) {
      logging.ConsoleError('Failed to set session storage : ', err);
    }
  }, [sessionStorageKey, storedValue]);
  var deleteSessionStorage = React.useCallback(function () {
    setStoredValue(initialValue);
    sessionStorage.removeItem(sessionStorageKey);
  }, [initialValue, sessionStorageKey]);
  return {
    storedValue: storedValue,
    setStoredValue: setStoredValue,
    deleteSessionStorage: deleteSessionStorage
  };
};

exports.useSessionStorage = useSessionStorage;
