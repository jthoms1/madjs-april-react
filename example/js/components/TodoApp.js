'use strict';

var React = require('react');
var TodoCollection = require('../utils/TodoCollection');
var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var log = require('../utils/logger')('TodoApp', '#b58900');

function getTodoState() {
  return {
    allTodos: TodoCollection.getAll(),
    areAllComplete: TodoCollection.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    log('getInitialState');
    return getTodoState();
  },

  componentWillMount() {
    log('componentWillMount');
    TodoCollection.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    log('componentWillUnmount');
    TodoCollection.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getTodoState());
  },

  /**
   * @return {object}
   */
  render: function() {
    log('render');
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
