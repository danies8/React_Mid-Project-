import React, { Component } from 'react';
import './userComponent.css';
import todosUtils from '../utils/todosUtils.js'

class UserComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUnCompletedUserTodos: true, name: "", email: "", street: "", city: "", zipcode: "",
      isHiddenStyle: true, isOrangeStyle: false,
    };
  }


   async componentDidMount() {
    let userTodos = await todosUtils.getAllTodsByUserId("https://jsonplaceholder.typicode.com/todos", this.props.user.id)
    let isUnCompletedUserTodos = true;
    for(let i=0; i<userTodos.length; i++){
      if(userTodos[i].completed.toString() == "false") {
        isUnCompletedUserTodos = false;
        break;
      }
    }
    this.setState({ isUnCompletedUserTodos: isUnCompletedUserTodos });
  }

  getName = (e) => {
    this.setState({ name: e.target.value });
  }

  getEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  getStreet = (e) => {
    this.setState({ street: e.target.value });
  }

  getCity = (e) => {
    this.setState({ city: e.target.value });
  }

  getZipcode = (e) => {
    this.setState({ zipcode: e.target.value });
  }

  getOtherData = () => {
    this.setState({ isHiddenStyle: false });
  }

  hideOtherData = () => {
    this.setState({ isHiddenStyle: true });
  }

  onUpdateUser = () => {
    let updateObj = {};
    updateObj.id = this.props.user.id;
    updateObj.name = this.state.name;
    updateObj.email = this.state.email;
    updateObj.street = this.state.street;
    updateObj.city = this.state.city;
    updateObj.zipcode = this.state.zipcode;

    this.props.updateUserCallback(updateObj);
  }

  onDeleteUser = () => {
    this.props.deleteUserCallback(this.props.user.id);
  }

  onClickOnUserId = async () => {
    await this.setState({ isOrangeStyle: !this.state.isOrangeStyle });
    this.props.onClickOnUserIdCallback(this.props.user.id, this.state.isOrangeStyle);
  }

  render() {
    let borderStyle;
    if (!this.state.isUnCompletedUserTodos) {
      borderStyle = "borderRedStyle";
    }
    else {
      borderStyle = "borderGreenStyle";
    }

    let hiddenStyle;
    if (this.state.isHiddenStyle) {
      hiddenStyle = "hiddenStyle";
    }
    else {
      hiddenStyle = "visibleStyle";
    }

    let orangeStyle;
    if (this.props.userId == this.props.user.id && this.state.isOrangeStyle) {
      orangeStyle = "orangeStyle";
    }
    else {
      orangeStyle = "regularStyle";
    }
  
    return (

      <div className={`${borderStyle} ${orangeStyle}`}>
        <label onClick={this.onClickOnUserId}>ID :</label>{this.props.user.id}<br />

        <label>Name :</label>
        <input type="text" defaultValue={this.props.user.name} onChange={this.getName} /><br />

        <label>Email :</label>
        <input type="text" defaultValue={this.props.user.email} onChange={this.getEmail} /><br />

        <input className="grayButton" type="button" value="Other Data" onMouseOver={this.getOtherData} />
        <div className={hiddenStyle} onMouseLeave={this.hideOtherData}>
          <label>Street :</label>
          <input type="text" defaultValue={this.props.user.address.street} onChange={this.getStreet} /><br />

          <label>City :</label>
          <input type="text" defaultValue={this.props.user.address.city} onChange={this.getCity} /><br />

          <label>Zip Code :</label>
          <input type="text" defaultValue={this.props.user.address.zipcode} onChange={this.getZipcode} /><br />
        </div>

        <div className="alignLeft">
          <input className="yellowButton" type="button" value="Update" onClick={this.onUpdateUser} />
          <input className="yellowButton" type="button" value="Delete" onClick={this.onDeleteUser} />
        </div>
        <br />
      </div>
    );
  }
}

export default UserComponent;
