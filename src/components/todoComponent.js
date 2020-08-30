import React, { Component } from 'react';
import './todoComponent.css';

class TodoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { todo: {} };
  }

  componentDidMount() {
    this.setState({ todo: this.props.todo });
  }

  onMarkCompleted = () => {
    this.state.todo.completed = true;
    this.setState({ todo: this.state.todo });
  }


  render() {

    return (

      <div className="borderPurpleStyle">
        Title: {this.props.todo.title} <br />
        Completed: {this.props.todo.completed.toString()}
        <input className={(this.props.todo.completed.toString() == "false") ? "markCompletedVisibleStyle" : "markCompletedHiddenStyle"}
          type="button" value="Mark Completed" onClick={this.onMarkCompleted} />
      </div>
    );
  }
}

export default TodoComponent;
