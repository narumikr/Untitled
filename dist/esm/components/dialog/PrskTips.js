'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { Backdrop } from '../backdrop/Backdrop.js';
import { LightBulbSvg } from '../../img/lightBulb.js';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { usePortalContainer } from '../../internal/usePortalContainer.js';
import globalStyles from '../../styles/global.module.scss.js';
import styles from './PrskTips.module.scss.js';

var _excluded = ["sekai", "themeMode", "open", "tipsText", "containerComponent", "withOverlay"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var PrskTips = function PrskTips(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    open = _ref.open,
    tipsText = _ref.tipsText,
    containerComponent = _ref.containerComponent,
    _ref$withOverlay = _ref.withOverlay,
    withOverlay = _ref$withOverlay === void 0 ? true : _ref$withOverlay,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var portalContainer = usePortalContainer(containerComponent);
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  if (!portalContainer) return null;
  var tipsContent = /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    className: clsx(globalStyles["sekai-color-".concat(modeTheme)], styles['sekai-container'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement(TipsHeader, {
    sekai: sekai,
    themeMode: modeTheme
  }), /*#__PURE__*/React.createElement("p", {
    className: clsx(styles['sekai-tips-content'])
  }, tipsText));
  if (withOverlay) {
    return /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(Backdrop, {
      open: open,
      themeMode: themeMode,
      containerComponent: containerComponent,
      centered: true,
      blur: true
    }, tipsContent), portalContainer);
  }
  return /*#__PURE__*/createPortal(open ? /*#__PURE__*/React.createElement("div", {
    className: styles['sekai-tips-no-overlay']
  }, tipsContent) : null, portalContainer);
};
var TipsTitle = 'TIPS';
var TipsHeader = function TipsHeader(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(styles['sekai-tips-header'])
  }, /*#__PURE__*/React.createElement(LightBulbSvg, {
    sekai: sekai,
    themeMode: themeMode,
    className: styles['sekai-lightbulb']
  }), /*#__PURE__*/React.createElement("h2", null, TipsTitle));
};

export { PrskTips };
