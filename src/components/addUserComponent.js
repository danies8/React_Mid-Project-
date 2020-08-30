import React, { Component } from 'react';
import './addUserComponent.css';

class AddUserComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "", email: "" };
  }
  

  getName = (e) => {
    this.setState({name:e.target.value});
  }

  getEmail = (e) => {
    this.setState({email:e.target.value});
  }

  onCancelUser = () => {
     this.props.cancelAddUserCallback(true);
  }

  onAddUser =  () => {
    this.props.addUserCallback(this.state.name, this.state.email);
   }
   
   
  render() {

    return (

      <div className="borderPurpleStyle">
        Name: <input type="text" onChange={this.getName}/> <br/>
        Email: <input type="text" onChange={this.getEmail}/> <br/>
         <input className="yellowButton" type="button" value="Add" onClick={this.onAddUser} />
         <input className="yellowButton" type="button" value="Cancel" onClick={this.onCancelUser} /><br/>
      </div>
    );
  }
}

export default AddUserComponent;
