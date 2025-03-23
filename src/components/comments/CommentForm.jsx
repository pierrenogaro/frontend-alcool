import { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onSubmit(content);
            setContent('');
        } catch (err) {
            setError('Failed to add comment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add a comment..."
                        rows="3"
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Posting...
                        </>
                    ) : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;