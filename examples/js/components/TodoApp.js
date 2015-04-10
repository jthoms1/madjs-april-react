'use strict';

var React = require('react');
var TodoCollection = require('../utils/TodoCollection');
var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');

function getTodoState() {
  return {
    allTodos: TodoCollection.getAll(),
    areAllComplete: TodoCollection.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentWillMount() {
    TodoCollection.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoCollection.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getTodoState());
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
});

module.exports = TodoApp;
