import React from 'react';

function Comment({ comment }) {
  const d = new Date(comment.createdAt);
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">{d.toLocaleString()}</span>
        <span className="post-comment-likes">{comment.likes.length} likes</span>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
