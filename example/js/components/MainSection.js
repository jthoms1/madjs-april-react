'use strict';

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var log = require('../utils/logger')('MainSection');

var TodoCollection = require('../utils/TodoCollection');
var TodoItem = require('./TodoItem');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    log('render');
    if (this.props.allTodos.size < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = allTodos.map(function(todo, index) {
      return (
        <TodoItem key={index} index={index} todo={allTodos.get(index)} />
      );
    });

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          <ReactCSSTransitionGroup transitionName="todoitem">
            {todos}
          </ReactCSSTransitionGroup>
        </ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoCollection.toggleAllComplete();
  }
});

module.exports = MainSection;
