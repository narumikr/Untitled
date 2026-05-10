'use client';
'use strict';

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var React = require('react');
var clsx = require('clsx');
var reactDom = require('react-dom');
var Backdrop = require('../backdrop/Backdrop.js');
var lightBulb = require('../../img/lightBulb.js');
var useOptionalSekai = require('../../internal/useOptionalSekai.js');
var usePortalContainer = require('../../internal/usePortalContainer.js');
var global_module = require('../../styles/global.module.scss.js');
var PrskTips_module = require('./PrskTips.module.scss.js');

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
  var _useOptionalSekai = useOptionalSekai.useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme;
  var portalContainer = usePortalContainer.usePortalContainer(containerComponent);
  var optionStyle = {
    '--sekai-color': sekaiColor
  };
  if (!portalContainer) return null;
  var tipsContent = /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "dialog",
    className: clsx(global_module["sekai-color-".concat(modeTheme)], PrskTips_module['sekai-container'], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), /*#__PURE__*/React.createElement(TipsHeader, {
    sekai: sekai,
    themeMode: modeTheme
  }), /*#__PURE__*/React.createElement("p", {
    className: clsx(PrskTips_module['sekai-tips-content'])
  }, tipsText));
  if (withOverlay) {
    return /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(Backdrop.Backdrop, {
      open: open,
      themeMode: themeMode,
      containerComponent: containerComponent,
      centered: true,
      blur: true
    }, tipsContent), portalContainer);
  }
  return /*#__PURE__*/reactDom.createPortal(open ? /*#__PURE__*/React.createElement("div", {
    className: PrskTips_module['sekai-tips-no-overlay']
  }, tipsContent) : null, portalContainer);
};
var TipsTitle = 'TIPS';
var TipsHeader = function TipsHeader(_ref2) {
  var sekai = _ref2.sekai,
    themeMode = _ref2.themeMode;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(PrskTips_module['sekai-tips-header'])
  }, /*#__PURE__*/React.createElement(lightBulb.LightBulbSvg, {
    sekai: sekai,
    themeMode: themeMode,
    className: PrskTips_module['sekai-lightbulb']
  }), /*#__PURE__*/React.createElement("h2", null, TipsTitle));
};

exports.PrskTips = PrskTips;
