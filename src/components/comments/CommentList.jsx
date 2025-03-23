import { useState } from 'react';
import CommentEdit from './CommentEdit';

const CommentsList = ({ comments, currentUser, onDelete, onUpdate }) => {
    const [expandedComments, setExpandedComments] = useState({});
    const [editingComment, setEditingComment] = useState(null);

    if (!comments || comments.length === 0) {
        return <p className="text-center mt-3">No comments yet</p>;
    }

    const toggleExpanded = (commentId) => {
        setExpandedComments({
            ...expandedComments,
            [commentId]: !expandedComments[commentId]
        });
    };

    const handleSaveEdit = async (commentId, content) => {
        await onUpdate(commentId, content);
        setEditingComment(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' à ' + date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return '';
        }
    };

    const isUserAuthor = (comment) => {
        if (!currentUser || !comment.author) return false;

        if (typeof comment.author === 'object') {
            return currentUser.username === comment.author.username;
        } else if (typeof comment.author === 'string' && currentUser._id) {
            return currentUser._id === comment.author;
        }

        return false;
    };

    return (
        <div className="comment-list mt-4">
            <h5>Recent Comments</h5>
            {comments.map(comment => {
                const isAuthor = isUserAuthor(comment);
                const isExpanded = expandedComments[comment._id] || false;
                const isLongComment = comment.content && comment.content.length > 100;
                const isEditing = editingComment === comment._id;
                const authorName = comment.author?.username || 'Anonymous';
                const commentDate = formatDate(comment.createdAt);

                return (
                    <div key={comment._id} className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">
                                    {authorName} {commentDate && <span>• {commentDate}</span>}
                                </small>

                                {isAuthor && !isEditing && (
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setEditingComment(comment._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(comment._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {isEditing ? (
                                <CommentEdit
                                    comment={comment}
                                    onSave={handleSaveEdit}
                                    onCancel={() => setEditingComment(null)}
                                />
                            ) : (
                                <>
                                    <p className="mt-2">
                                        {isLongComment && !isExpanded
                                            ? comment.content.substring(0, 100) + '...'
                                            : comment.content}
                                    </p>

                                    {isLongComment && (
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => toggleExpanded(comment._id)}
                                        >
                                            {isExpanded ? 'Show less' : 'Read more'}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentsList;