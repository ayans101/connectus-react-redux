import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike } from '../actions/posts';

class Comment extends Component {
  handleCommentLike = () => {
    const { comment, user } = this.props;
    console.log("&&&", comment);
    this.props.dispatch(addLike(comment._id, 'Comment', user._id, comment.post));
  };
  render() {
    const { comment, user } = this.props;
    const d = new Date(comment.createdAt);
    const isCommentLikedByUser = comment.likes.includes(user._id);

    return (
      <div className="post-comment-item">
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">{d.toLocaleString()}</span>
          <span className="post-comment-likes">
            <button
              className="comment-like no-btn"
              onClick={this.handleCommentLike}
            >
              {isCommentLikedByUser ? (
                <img
                  src="/unlike.png"
                  alt="like post"
                />
              ) : (
                <img
                  src="/like.png"
                  alt="likes-icon"
                />
              )}
              <span>{comment.likes.length}</span>
            </button>
          </span>
        </div>

        <div className="post-comment-content">{comment.content}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Comment);
