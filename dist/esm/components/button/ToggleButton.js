'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import styles from './ToggleButton.module.scss.js';

var _excluded = ["checked", "onChange", "labelText", "direction", "labelPosition", "disabled", "sekai", "themeMode"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var isValidVerticalPosition = function isValidVerticalPosition(position) {
  return position === 'top' || position === 'bottom';
};
var isValidHorizontalPosition = function isValidHorizontalPosition(position) {
  return position === 'left' || position === 'right';
};
var getResolvedLabelPosition = function getResolvedLabelPosition(direction, labelPosition) {
  var isVertical = direction === 'vertical';
  var isTopOrBottom = isValidVerticalPosition(labelPosition);
  var isLeftOrRight = isValidHorizontalPosition(labelPosition);
  if (isVertical) {
    return isTopOrBottom ? labelPosition : 'bottom';
  }
  return isLeftOrRight ? labelPosition : 'right';
};
var renderLabel = function renderLabel(labelText, shouldRender) {
  if (!labelText || !shouldRender) return null;
  return /*#__PURE__*/React.createElement("span", {
    className: styles['sekai-toggle-label'],
    "data-testid": "toggle-label"
  }, labelText);
};
var ToggleButton = function ToggleButton(_ref) {
  var checked = _ref.checked,
    onChange = _ref.onChange,
    labelText = _ref.labelText,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    labelPosition = _ref.labelPosition,
    disabled = _ref.disabled,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var sekaiColorBg = convertHexToRgba(sekaiColor, 0.12);
  var optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorBg
  };
  var resolvedLabelPosition = getResolvedLabelPosition(direction, labelPosition);
  var isLabelBefore = resolvedLabelPosition === 'left' || resolvedLabelPosition === 'top';
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    ref: rest.ref,
    role: "switch",
    type: "button",
    "aria-checked": checked,
    disabled: disabled,
    onClick: function onClick() {
      return onChange(!checked);
    },
    className: clsx(styles['sekai-toggle-button'], styles["sekai-toggle-button--".concat(modeTheme)], direction === 'vertical' && styles['sekai-toggle-button--vertical'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), renderLabel(labelText, isLabelBefore), /*#__PURE__*/React.createElement("span", {
    className: clsx(styles['sekai-toggle-track'], checked && styles['sekai-toggle-track--on'])
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx(styles['sekai-toggle-thumb'], checked && styles['sekai-toggle-thumb--on'])
  })), renderLabel(labelText, !isLabelBefore));
};

export { ToggleButton };
