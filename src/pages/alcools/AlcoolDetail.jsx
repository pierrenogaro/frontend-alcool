import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import CommentForm from "../../components/comments/CommentForm.jsx";
import CommentsList from "../../components/comments/CommentList.jsx";

const AlcoolDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, token, user } = useAuth();

    const [alcool, setAlcool] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlcoolDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/alcools/${id}`);
                setAlcool(response.data.alcool);
                setComments(response.data.comments || []);
                setLoading(false);
            } catch (err) {
                setError('Error fetching alcool details');
                setLoading(false);
            }
        };

        fetchAlcoolDetails();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this alcool?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8081/alcools/delete/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            navigate('/alcools');
        } catch (err) {
            setError('Error deleting alcool');
        }
    };

    const handleCommentSubmit = async (content) => {
        try {
            const response = await axios.post(`http://localhost:8081/comments/${id}`,
                { content },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );

            const newComment = response.data;

            if (!newComment.author || typeof newComment.author === 'string') {
                newComment.author = {
                    _id: typeof newComment.author === 'string' ? newComment.author : user._id,
                    username: user.username
                };
            }

            setComments([...comments, newComment]);
        } catch (err) {
            setError('Error adding comment');
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8081/comments/${commentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (err) {
            setError('Error deleting comment');
        }
    };

    const handleCommentUpdate = async (commentId, content) => {
        try {
            const response = await axios.put(`http://localhost:8081/comments/${commentId}`,
                { content },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );

            const updatedComment = response.data;
            if (!updatedComment.author || typeof updatedComment.author === 'string') {
                const originalComment = comments.find(c => c._id === commentId);
                updatedComment.author = originalComment.author;
            }

            setComments(comments.map(comment =>
                comment._id === commentId ? updatedComment : comment
            ));
        } catch (err) {
            setError('Error updating comment');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!alcool) return <div>Alcool not found</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2>{alcool.name} <span className="badge bg-warning text-dark">{alcool.degree}°</span></h2>
                        </div>
                        <div className="card-body">
                            {alcool.description && <p>{alcool.description}</p>}

                            {alcool.ingredients?.length > 0 && (
                                <div>
                                    <h5>Ingredients</h5>
                                    <ul>
                                        {alcool.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {alcool.author && (
                                <p className="text-muted">Added by: {alcool.author.username}</p>
                            )}

                            {isLoggedIn && alcool.author && user && alcool.author.username === user.username && (
                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        onClick={() => navigate(`/alcools/edit/${id}`)}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>Comments</h4>
                        </div>
                        <div className="card-body">
                            {isLoggedIn ? (
                                <CommentForm onSubmit={handleCommentSubmit} />
                            ) : (
                                <p>Please login to add comments</p>
                            )}

                            <CommentsList
                                comments={comments}
                                currentUser={user}
                                onDelete={handleCommentDelete}
                                onUpdate={handleCommentUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/alcools')}
                className="btn btn-primary mt-3"
            >
                Back to List
            </button>
        </div>
    );
};

export default AlcoolDetail;