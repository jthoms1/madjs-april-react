'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var Todo = Immutable.Record({
    title: undefined,
    complete: false
});
var todos = [];
/*
for (var i = 1; i< 1001;i += 1) {
  todos.push(new Todo({
    title: 'todo #' + i
  }));
}
*/
var todoList = Immutable.List(todos);


var TodoCollection = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit('change');
  },
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
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
