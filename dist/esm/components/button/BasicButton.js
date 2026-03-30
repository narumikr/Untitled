'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './BasicButton.module.scss.js';

var _excluded = ["sekai", "themeMode", "withTextSekaiColor", "children", "disabled"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var BasicButton = function BasicButton(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    _ref$withTextSekaiCol = _ref.withTextSekaiColor,
    withTextSekaiColor = _ref$withTextSekaiCol === void 0 ? false : _ref$withTextSekaiCol,
    children = _ref.children,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3);
  var optionStyle = _objectSpread({
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover
  }, withTextSekaiColor && {
    color: sekaiColor
  });
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    ref: rest.ref,
    type: "button",
    className: clsx(styles["sekai-basic-button-".concat(modeTheme)], globalStyles["sekai-color-".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style),
    disabled: disabled
  }), children);
};

export { BasicButton };
