'use client';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import React from 'react';
import clsx from 'clsx';
import { useOptionalSekai } from '../../internal/useOptionalSekai.js';
import { convertHexToRgba } from '../../utils/converter.js';
import styles from './Tab.module.scss.js';

var _excluded = ["sekai", "themeMode", "tabList", "currentTab", "onChange", "variant"],
  _excluded2 = ["children", "tabIndex", "currentTab"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var buildVariantStyle = function buildVariantStyle(sekaiColor, isLight) {
  var sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.4);
  return {
    '--sekai-color': sekaiColor,
    '--sekai-color-bg': sekaiColorHover
  };
};
var Tab = function Tab(_ref) {
  var sekai = _ref.sekai,
    themeMode = _ref.themeMode,
    tabList = _ref.tabList,
    currentTab = _ref.currentTab,
    onChange = _ref.onChange,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'underline' : _ref$variant,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useOptionalSekai = useOptionalSekai({
      sekai: sekai,
      mode: themeMode
    }),
    sekaiColor = _useOptionalSekai.sekaiColor,
    modeTheme = _useOptionalSekai.modeTheme,
    isLight = _useOptionalSekai.isLight;
  var tabButtonRefs = React.useRef([]);
  var optionStyle = buildVariantStyle(sekaiColor, isLight);
  var focusTab = function focusTab(index) {
    var target = tabButtonRefs.current[index];
    if (!target) {
      return;
    }
    onChange(index);
    target.focus();
  };
  var handleTabKeyDown = function handleTabKeyDown(event, index) {
    var nextIndex = null;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabList.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabList.length) % tabList.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabList.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    focusTab(nextIndex);
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tablist",
    className: clsx(styles['sekai-tab'], styles["sekai-tab--".concat(variant)], styles["sekai-tab--".concat(modeTheme)], rest.className),
    style: _objectSpread(_objectSpread({}, optionStyle), rest.style)
  }), tabList.map(function (tab, index) {
    return /*#__PURE__*/React.createElement(TabItemButton, {
      key: tab.label,
      variant: variant,
      modeTheme: modeTheme,
      tab: tab,
      selected: index === currentTab,
      buttonRef: function buttonRef(node) {
        tabButtonRefs.current[index] = node;
      },
      onKeyDown: function onKeyDown(event) {
        return handleTabKeyDown(event, index);
      },
      onClick: function onClick() {
        return onChange(index);
      },
      id: "sekai-tab-".concat(index),
      ariaControls: "sekai-tabpanel-".concat(index)
    });
  }));
};
var TabItemButton = function TabItemButton(_ref2) {
  var variant = _ref2.variant,
    modeTheme = _ref2.modeTheme,
    tab = _ref2.tab,
    selected = _ref2.selected,
    buttonRef = _ref2.buttonRef,
    onKeyDown = _ref2.onKeyDown,
    onClick = _ref2.onClick,
    id = _ref2.id,
    ariaControls = _ref2.ariaControls;
  return /*#__PURE__*/React.createElement("button", {
    ref: buttonRef,
    type: "button",
    role: "tab",
    id: id,
    "aria-controls": ariaControls,
    "aria-selected": selected,
    tabIndex: selected ? 0 : -1,
    onKeyDown: onKeyDown,
    onClick: onClick,
    className: clsx(styles['sekai-tab-item'], styles["sekai-tab-item--".concat(variant)], styles["sekai-tab-item--".concat(modeTheme)], selected && styles['sekai-tab-item--selected'])
  }, tab.icon, /*#__PURE__*/React.createElement("span", {
    className: styles['sekai-tab-item-label']
  }, tab.label));
};
var TabPanel = function TabPanel(_ref3) {
  var children = _ref3.children,
    tabIndex = _ref3.tabIndex,
    currentTab = _ref3.currentTab,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var isVisible = currentTab === tabIndex;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tabpanel",
    hidden: !isVisible,
    id: "sekai-tabpanel-".concat(tabIndex),
    "aria-labelledby": "sekai-tab-".concat(tabIndex),
    className: clsx(styles['sekai-tabpanel'], isVisible ? styles['sekai-tabpanel--visible'] : styles['sekai-tabpanel--hidden'], rest.className),
    style: rest.style
  }), isVisible ? children : null);
};

export { Tab, TabPanel };
