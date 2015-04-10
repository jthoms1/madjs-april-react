'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var Todo = Immutable.Record({
    title: undefined,
    complete: false
});

var todoList = Immutable.List();

var TodoCollection = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  /*
   *
   */
  getAll: function () {
    return todoList;
  },

  /*
   *
   */
  areAllComplete: function () {
    return todoList.every(function (todo) {
      return todo.complete;
    });
  },

  /*
   *
   */
  toggleAllComplete: function () {
    todoList = todoList.map(function(todo) {
      return new Todo({
        title: todo.title,
        complete: true
      });
    });
    TodoCollection.emitChange();
  },

  /*
   *
   */
  destroyCompleted: function () {
    todoList = todoList.filter(function(todo) {
      return !todo.complete;
    });
    TodoCollection.emitChange();
  },

  /*
   *
   */
  updateText: function (index, text) {
    todoList = todoList.set(index, new Todo({
      title: text
    }));
    TodoCollection.emitChange();
  },

  /*
   *
   */
  toggleComplete: function (index) {
    var prevTodo = todoList.get(index);

    todoList = todoList.set(index, new Todo({
      title: prevTodo.title,
      complete: true
    }));
    TodoCollection.emitChange();
  },

  /*
   *
   */
  create: function (text) {
    todoList = todoList.push(new Todo({
      title: text
    }));
    TodoCollection.emitChange();
  },

  /*
   *
   */
  destroy: function (index) {
    todoList = todoList.delete(index);
    TodoCollection.emitChange();
  }
});

module.exports = TodoCollection;
