import React, { Component } from 'react';
import './addPostComponent.css';

class AddPostComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { title: "", body: "" };
  }

  getTitle = (e) => {
    this.setState({title:e.target.value});
  }

  getBody = (e) => {
    this.setState({body:e.target.value});
  }

  onCancelPost = () => {
    this.props.cancelAddPostCallback(this.props.userId, true)
  }

  onAddPost = () => {
     this.props.addPostCallback(this.props.userId, this.state.title, this.state.body)
  }

  render() {

    return (

      <div className="borderPurpleStyle">
        Title: <input type="text" onChange={this.getTitle}/> <br/>
        Body: <input type="text" onChange={this.getBody}/> <br/>
         <input className="yellowButton" type="button" value="Add" onClick={this.onAddPost} />
         <input className="yellowButton" type="button" value="Cancel" onClick={this.onCancelPost} /><br/>
      </div>
    );
  }
}

export default AddPostComponent;
