import { useState } from 'react';

const CommentEdit = ({ comment, onSave, onCancel }) => {
    const [content, setContent] = useState(comment.content);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        setLoading(true);
        try {
            await onSave(comment._id, content);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
        <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            disabled={loading}
        />
            </div>
            <div className="d-flex gap-2">
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CommentEdit;