'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _event_body_message = require('./event_body_message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiEventBodyMessage', () => {
  const component = _react2.default.createElement(
    _event_body_message.KuiEventBodyMessage,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
