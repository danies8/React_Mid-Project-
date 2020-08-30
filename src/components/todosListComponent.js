import React, { Component } from 'react';
import TodoComponent from './todoComponent';
import './todosListComponent.css';

class TodosListComponent extends Component {

  constructor(props) {
    super(props);
  }

  onAddNewTodo = () => {
    this.props.addNewTodoCallback(true);
  }

  render() {
   
    return (
      <div>
        Todo- User {this.props.userId}
        <input className="yellowButton" type="button" value="Add" onClick={this.onAddNewTodo} />
        {this.props.todos.map((todo) => {
          return <TodoComponent key={todo.id} todo={todo} />
        })}
      </div>
    );
  }
}

export default TodosListComponent;
