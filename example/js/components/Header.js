'use strict';

var React = require('react');
var TodoCollection = require('../utils/TodoCollection');
var TodoTextInput = require('./TodoTextInput');
var log = require('../utils/logger')('Header');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    log('render');
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()) {
      TodoCollection.create(text);
    }
  }
});

module.exports = Header;
