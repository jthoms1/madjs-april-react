'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var log = require('../utils/logger')('Footer');

var TodoCollection = require('../utils/TodoCollection');

var Footer = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    log('render');
    var allTodos = this.props.allTodos;
    var total = allTodos.size;

    if (total === 0) {
      return null;
    }

    var completed = allTodos
      .filter(function (todo) {
        return todo.complete;
      })
      .size;

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TodoCollection.destroyCompleted();
  }
});

module.exports = Footer;

