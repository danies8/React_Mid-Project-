import React, { Component } from 'react';
import './addTodoComponent.css';

class AddTodoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  getTitle = (e) => {
    this.setState({title:e.target.value});
  }

  onCancelTodo = () => {
     this.props.cancelAddTodosCallback(this.props.userId, true)
  }

  onAddTodo = () => {
    this.props.addTodosCallback(this.props.userId, this.state.title)
  }
  render() {

    return (

      <div className="borderPurpleStyle">
        Title: <input type="text" onChange={this.getTitle}/> <br/>
         <input className="yellowButton" type="button" value="Add" onClick={this.onAddTodo} />
         <input className="yellowButton" type="button" value="Cancel" onClick={this.onCancelTodo} /><br/>
      </div>
    );
  }
}

export default AddTodoComponent;
