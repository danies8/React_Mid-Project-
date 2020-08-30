import React ,{Component} from 'react';
import UserComponent from './userComponent'

class UsersListComponent extends Component{

  constructor(props){
    super(props);
    this.state = {userId: ""};
   }

  deleteUser = (userId) => {
    this.props.deleteUserCallback(userId);
  }

  updateUsersList = (updateObject) => {
    this.props.updateUsersListCallback(updateObject);
  }

  updatePostsTodos = (userId, isUserClickedToBringDataOnTodos) => {
    this.props.updatePostsTodosCallback(userId, isUserClickedToBringDataOnTodos);
    this.setState({userId:userId});
   }

  render() {
    let users = this.props.users.map((user, index)=>{
     return <UserComponent key= {user.id} user={user} userId={this.state.userId} 
     deleteUserCallback={userId=> this.deleteUser(userId)}
     updateUserCallback={updateObject=> this.updateUsersList(updateObject)}
     onClickOnUserIdCallback={(userId, isUserClickedToBringDataOnTodos) => this.updatePostsTodos(userId, isUserClickedToBringDataOnTodos)} />
    });

  return (
    <div>
      {users}
     </div>
  );
}
}

export default UsersListComponent;
