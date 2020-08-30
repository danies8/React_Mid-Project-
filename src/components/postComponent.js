import React, { Component } from 'react';
import './postComponent.css';

class PostComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      
      <div className="borderPurpleStyle">
        Title: {this.props.post.title} <br />
        Body: {this.props.post.body}
       </div>
    );
  }
}

export default PostComponent;
