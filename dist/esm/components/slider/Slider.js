'use client';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import styles from './Slider.module.scss.js';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var getPercent = function getPercent(value, min, max) {
  if (min >= max) return 0;
  var ratio = (value - min) / (max - min);
  return Math.min(100, Math.max(0, ratio * 100));
};
var getInitialValue = function getInitialValue(value, defaultValue) {
  return defaultValue !== null && defaultValue !== void 0 ? defaultValue : value;
};
var getTrackColor = function getTrackColor(sekaiColor, isLight) {
  return convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.3);
};
var getSliderClassName = function getSliderClassName(modeTheme, isVertical, disabled, className) {
  return clsx(styles['sekai-slider'], styles["sekai-slider--".concat(modeTheme)], isVertical && styles['sekai-slider--vertical'], disabled && styles['sekai-slider--disabled'], className);
};
var renderValueTooltip = function renderValueTooltip(showValue, currentValue) {
  if (!showValue) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-slider-value'],
    "aria-hidden": "true"
  }, currentValue);
};
var Slider = function Slider(_ref) {
  var id = _ref.id,
    className = _ref.className,
    style = _ref.style,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    value = _ref.value,
    defaultValue = _ref.defaultValue,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step,
    onChange = _ref.onChange,
    disabled = _ref.disabled,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? 'horizontal' : _ref$orientation,
    _ref$showValue = _ref.showValue,
    showValue = _ref$showValue === void 0 ? false : _ref$showValue;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var _useState = useState(getInitialValue(value, defaultValue)),
    _useState2 = _slicedToArray(_useState, 2),
    internalValue = _useState2[0],
    setInternalValue = _useState2[1];
  var percent = getPercent(internalValue, min, max);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-track': getTrackColor(sekaiColor, isLight),
    '--sekai-slider-percent': "".concat(percent, "%")
  };
  var handleChange = function handleChange(e) {
    var nextValue = Number(e.target.value);
    setInternalValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue);
  };
  var isVertical = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: getSliderClassName(modeTheme, isVertical, disabled, className),
    style: _objectSpread(_objectSpread({}, optionStyle), style)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-slider-track']
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-slider-fill']
  }), renderValueTooltip(showValue, internalValue), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: internalValue,
    disabled: disabled,
    "aria-orientation": orientation,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": internalValue,
    onChange: handleChange,
    className: styles["sekai-slider-input--".concat(modeTheme)]
  })));
};

export { Slider };
