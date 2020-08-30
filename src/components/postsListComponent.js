import React, { Component } from 'react';
import PostComponent from './postComponent';
import './postsListComponent.css';

class PostsListComponent extends Component {

  constructor(props) {
    super(props);
  }

  onAddNewPost = () => {
    this.props.addNewPostCallback(true);
  }

  render() {
    let posts = this.props.posts.map((post, index) => {
      return <PostComponent key={post.id} post={post} />
    });

    return (
      <div>
        Post- User {this.props.userId}
        <input className="yellowButton" type="button" value="Add" onClick={this.onAddNewPost}/>
        {posts}
      </div>
    );
  }
}

export default PostsListComponent;
