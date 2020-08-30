import React, { Component } from 'react';
import './App.css';

import UsersListComponent from './components/usersListComponent'
import TodosListComponent from './components/todosListComponent';
import PostsListComponent from './components/postsListComponent';
import AddTodoComponent from './components/addTodoComponent';
import AddPostComponent from './components/addPostComponent';
import AddUserComponent from './components/addUserComponent';

import usersUtils from './utils/usersUtils.js'
import todosUtils from './utils/todosUtils.js'
import postsUtils from './utils/postsUtils.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [], cachedUsers: [], todos: [], userId: "", posts: [],
      isUserClickedToBringDataOnTodos: false,
      isUserClickedToCancelNewTodo: false, showAddNewTodo: false,
      isUserClickedToCancelNewPost: false, showAddNewPost: false,
      isUserClickedToCancelNewUser: false, showAddNewUser: false,
    };
  }

  async componentDidMount() {
    let resp = await usersUtils.getAllUsers("https://jsonplaceholder.typicode.com/users");
    this.setState({
      users: resp.data.sort(),
      cachedUsers: resp.data.sort()
    });
  }

  // Search
  onSerachUsers = (e) => {
    let searchValue = e.target.value.toString().toLowerCase();

    if (searchValue == '') {
      this.setState({ users: this.state.cachedUsers });
      return;
    }
    else {
      let filterUsers = this.state.cachedUsers.filter(user => {
        return user.name.toString().toLowerCase().includes(searchValue) ||
          user.email.toString().toLowerCase().includes(searchValue)
      });
      this.setState({ users: filterUsers });
    }
  }

  deleteUser = async (userId) => {
    const index = this.state.cachedUsers.findIndex(user => user.id == userId);
    if (index > -1) {
      this.state.cachedUsers.splice(index, 1);
      await this.setState({ cachedUsers: this.state.cachedUsers });
      let filterUsers = this.state.users.filter(user => user.id != userId);
      await this.setState({ users: filterUsers });
    }
  }


  updateUsersList = async (updateObject) => {
    let currentUser = this.state.cachedUsers.find(user => user.id == updateObject.id);
    currentUser.name = updateObject.name;
    currentUser.email = updateObject.email;
    currentUser.address.street = updateObject.street;
    currentUser.address.city = updateObject.city;
    currentUser.address.zipcode = updateObject.zipcode;
    await this.setState({ cachedUsers: this.state.cachedUsers });

    currentUser = this.state.users.find(user => user.id == updateObject.id);
    currentUser.name = updateObject.name;
    currentUser.email = updateObject.email;
    currentUser.address.street = updateObject.street;
    currentUser.address.city = updateObject.city;
    currentUser.address.zipcode = updateObject.zipcode;
    await this.setState({ users: this.state.users });
  }


  // Posts-Todos
  updatePostsTodos = async (userId, isUserClickedToBringDataOnTodos) => {
    let todos = await todosUtils.getAllTodsByUserId("https://jsonplaceholder.typicode.com/todos", userId);
    this.setState({
      todos: todos,
      userId: userId,
      isUserClickedToBringDataOnTodos: isUserClickedToBringDataOnTodos
    });
    let posts = await postsUtils.getAllPostsByUserId("https://jsonplaceholder.typicode.com/posts", userId);
    this.setState({ posts: posts });
  }

  // Todo
  addNewTodoCallback = () => {
    this.setState({
      isUserClickedToCancelNewTodo: false,
      showAddNewTodo: true,
      showAddNewPost: false,
      isUserClickedToCancelNewPost: false,
      showAddNewUser: false,
      isUserClickedToCancelNewUser: false
    });
  }

  cancelAddTodoCallback = (userId, isUserClickedToCancelNewTodo) => {
    let filterTodos = this.state.todos.filter(todo => todo.userId == userId);
    this.setState({
      todos: filterTodos,
      isUserClickedToCancelNewTodo: isUserClickedToCancelNewTodo
    });
  }

  addTodosCallback = (userId, title) => {
    let todo = {};
    let max = 0;
    this.state.todos.forEach(todo => {
      if (todo.id > max) {
        max = todo.id;
      }
    });
    todo.id = max + 1;
    todo.userId = userId;
    todo.title = title;
    todo.completed = false;
    this.setState({
      todos: [...this.state.todos, todo],
      showAddNewTodo: false
    });
  }

  // Post
  addNewPostCallback = () => {
    this.setState({
      isUserClickedToCancelNewPost: false,
      showAddNewPost: true,
      showAddNewTodo: false,
      isUserClickedToCancelNewTodo: false,
      isUserClickedToCancelNewPost: false,
      isUserClickedToCancelNewUser: false,
      isUserClickedToCancelNewUser: false
    });
  }

  cancelAddPostCallback = (userId, isUserClickedToCancelNewPost) => {
    let filterPosts = this.state.posts.filter(post => post.userId == userId);
    this.setState({
      posts: filterPosts,
      isUserClickedToCancelNewPost: isUserClickedToCancelNewPost
    });
  }

  addPostCallback = (userId, title, body) => {
    let post = {};
    let max = 0;
    this.state.posts.forEach(post => {
      if (post.id > max) {
        max = post.id;
      }
    });
    post.id = max + 1;
    post.userId = userId;
    post.title = title;
    post.body = body;
    this.setState({
      posts: [...this.state.posts, post],
      showAddNewPost: false
    });
  }

  // User
  cancelAddUserCallback = (isUserClickedToCancelNewUser) => {
    this.setState({
      users: this.state.cachedUsers,
      isUserClickedToCancelNewUser: isUserClickedToCancelNewUser
    });
  }

  addUserCallback = async (name, email) => {
    let user = {};
    let address = {};
    let max = 0;
    this.state.cachedUsers.forEach(user => {
      if (user.id > max) {
        max = user.id;
      }
    });
    user.id = max + 1;
    user.name = name;
    user.email = email;
    address.street = '';
    address.city = '';
    address.zipcode = '';
    user.address = address;

    await this.setState({
      cachedUsers: [...this.state.cachedUsers, user],
      users: [...this.state.users, user],
      showAddNewUser: false
    });
  }

  onAddUser = () => {
    this.setState({ showAddNewUser: true ,
      isUserClickedToCancelNewUser: false});
   }

  render() {

    let todosPostsVisiblityStyle;
    let showAddNewTodoStyle;
    let showPostsListVisiblityStyle;
    let showTodosListVisiblityStyle;
    let showAddNewPostStyle;
    let showAddNewUserStyle;

    if (this.state.isUserClickedToBringDataOnTodos) {
      todosPostsVisiblityStyle = "visiblityElementStyle";
    }
    else {
      todosPostsVisiblityStyle = "hiddenElementStyle";
    }

    if (this.state.showAddNewTodo) {
      showPostsListVisiblityStyle = showAddNewTodoStyle = "visiblityElementStyle";
      showTodosListVisiblityStyle = "hiddenElementStyle";
    }
    else {
      showAddNewTodoStyle = "hiddenElementStyle";
    }

    if (this.state.isUserClickedToCancelNewTodo) {
      showPostsListVisiblityStyle = showTodosListVisiblityStyle = "visiblityElementStyle";
      showAddNewTodoStyle = "hiddenElementStyle";
    }

    if (this.state.showAddNewPost) {
      showTodosListVisiblityStyle = showAddNewPostStyle = "visiblityElementStyle";
      showPostsListVisiblityStyle = "hiddenElementStyle";
    }
    else {
      showAddNewPostStyle = "hiddenElementStyle";
    }

    if (this.state.isUserClickedToCancelNewPost) {
      showPostsListVisiblityStyle = showTodosListVisiblityStyle = "visiblityElementStyle";
      showAddNewPostStyle = "hiddenElementStyle";
    }

    if (this.state.showAddNewUser) {
      showAddNewUserStyle = "visiblityElementStyle";
      showTodosListVisiblityStyle = showPostsListVisiblityStyle = "hiddenElementStyle";
    }
    else {
      showAddNewUserStyle = "hiddenElementStyle";
    }

    if (this.state.isUserClickedToCancelNewUser) {
      showTodosListVisiblityStyle = showPostsListVisiblityStyle = "visiblityElementStyle";
      showAddNewUserStyle = "hiddenElementStyle";
    }

    return (
      <div>
        <div className="borderUsersList">
          Search <input type="text" onChange={this.onSerachUsers} />
          <input className="yellowButton" type="button" value="Add" onClick={this.onAddUser} />
          <UsersListComponent users={this.state.users}
            deleteUserCallback={userId => this.deleteUser(userId)}
            updateUsersListCallback={updateObject => this.updateUsersList(updateObject)}
            updatePostsTodosCallback={(userId, isUserClickedToBringDataOnTodos) => this.updatePostsTodos(userId, isUserClickedToBringDataOnTodos)} />
        </div>
        <div className={`${"wrappper"}`}>
          <div className={`${"borderToDosList"}  ${todosPostsVisiblityStyle} ${showTodosListVisiblityStyle}`}>
            <TodosListComponent todos={this.state.todos} userId={this.state.userId}
              addNewTodoCallback={() => this.addNewTodoCallback()} />
          </div>

          <div className={`${"borderToDosAdd"} ${showAddNewTodoStyle}`}>
            <AddTodoComponent userId={this.state.userId}
              cancelAddTodosCallback={(userId, isUserClickedToCancelNewTodo) => this.cancelAddTodoCallback(userId, isUserClickedToCancelNewTodo)}
              addTodosCallback={(userId, title) => this.addTodosCallback(userId, title)} />
          </div>

          <div className={`${"borderPostsList"}   ${todosPostsVisiblityStyle} ${showPostsListVisiblityStyle}`}>
            <PostsListComponent posts={this.state.posts} userId={this.state.userId}
              addNewPostCallback={() => this.addNewPostCallback()} />
          </div>

          <div className={`${"borderToDosAdd"} ${showAddNewPostStyle}`}>
            <AddPostComponent userId={this.state.userId}
              cancelAddPostCallback={(userId, isUserClickedToCancelNewPost) => this.cancelAddPostCallback(userId, isUserClickedToCancelNewPost)}
              addPostCallback={(userId, title, body) => this.addPostCallback(userId, title, body)} />
          </div>

          <div className={`${"borderToDosAdd"} ${showAddNewUserStyle}`}>
            <AddUserComponent
              cancelAddUserCallback={(userId, isUserClickedToCancelNewUser) => this.cancelAddUserCallback(userId, isUserClickedToCancelNewUser)}
              addUserCallback={(name, email) => this.addUserCallback(name, email)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
