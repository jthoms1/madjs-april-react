'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');
var TodoCollection = require('../utils/TodoCollection');
var TodoTextInput = require('./TodoTextInput');

var log = require('../utils/logger')('TodoItem', '#268bd2');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

var TodoItem = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    log('getIntialState');
    return {
      isEditing: false
    };
  },
/*
  shouldComponentUpdate: function(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  },
*/
  render: function() {
    log('render');
    var todo = this.props.todo;
    var todoTextInput;

    if (this.state.isEditing) {
      todoTextInput =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.title}
        />;
    }

    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.title}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {todoTextInput}
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoCollection.toggleComplete(this.props.index);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoCollection.updateText(this.props.index, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoCollection.destroy(this.props.index);
  }
});

module.exports = TodoItem;
