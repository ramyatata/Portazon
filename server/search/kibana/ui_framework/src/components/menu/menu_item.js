'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const KuiMenuItem = (_ref) => {
  let className = _ref.className,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['className', 'children']);

  return _react2.default.createElement(
    'li',
    _extends({
      className: (0, _classnames2.default)('kuiMenuItem', className)
    }, rest),
    children
  );
};

exports.KuiMenuItem = KuiMenuItem;
KuiMenuItem.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};
