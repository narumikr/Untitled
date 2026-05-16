import React from 'react';
import { COLOR_LIGHT_MODE, COLOR_DARK_MODE } from '../internal/color.constant.js';
import { useOptionalSekai } from '../internal/useOptionalSekai.js';

var LightBulbSvg = function LightBulbSvg(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    sekai = _ref.sekai,
    themeMode = _ref.themeMode;
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    isLight = _useOptionalSekai.isLight;
  var color = isLight ? COLOR_LIGHT_MODE : COLOR_DARK_MODE;
  // center (50,40) r=22 — from (36,57) clockwise over the top to (64,57)
  var bulbArc = 'M 36 57 A 22 22 0 1 1 64 57';
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    viewBox: "0 0 100 100",
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, sekai ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: bulbArc,
    stroke: sekaiColor,
    strokeWidth: "15",
    fill: "none",
    strokeLinecap: "round",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "36",
    y1: "57",
    x2: "40",
    y2: "70",
    stroke: sekaiColor,
    strokeWidth: "15",
    strokeLinecap: "round",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "64",
    y1: "57",
    x2: "60",
    y2: "70",
    stroke: sekaiColor,
    strokeWidth: "15",
    strokeLinecap: "round",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "70",
    x2: "60",
    y2: "70",
    stroke: sekaiColor,
    strokeWidth: "15",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "41",
    y1: "76",
    x2: "59",
    y2: "76",
    stroke: sekaiColor,
    strokeWidth: "15",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "42",
    y1: "82",
    x2: "58",
    y2: "82",
    stroke: sekaiColor,
    strokeWidth: "15",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "31",
    x2: "50",
    y2: "49",
    stroke: sekaiColor,
    strokeWidth: "15",
    strokeLinecap: "round",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "59",
    r: "7",
    fill: sekaiColor,
    opacity: "0.7"
  })) : null, /*#__PURE__*/React.createElement("path", {
    d: bulbArc,
    stroke: color,
    strokeWidth: "8",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "36",
    y1: "57",
    x2: "40",
    y2: "70",
    stroke: color,
    strokeWidth: "8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "64",
    y1: "57",
    x2: "60",
    y2: "70",
    stroke: color,
    strokeWidth: "8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "70",
    x2: "60",
    y2: "70",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "41",
    y1: "76",
    x2: "59",
    y2: "76",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "42",
    y1: "82",
    x2: "58",
    y2: "82",
    stroke: color,
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "31",
    x2: "50",
    y2: "49",
    stroke: color,
    strokeWidth: "8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "59",
    r: "4",
    fill: color
  }));
};

export { LightBulbSvg };
