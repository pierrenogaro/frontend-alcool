import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const EditAlcool = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [name, setName] = useState('');
    const [degree, setDegree] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchAlcool = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/alcools/${id}`);
                const alcool = response.data.alcool;

                setName(alcool.name || '');
                setDegree(alcool.degree || '');
                setDescription(alcool.description || '');
                setIngredients(alcool.ingredients ? alcool.ingredients.join(', ') : '');
                setLoading(false);
            } catch (err) {
                setError('Error loading alcool data');
                setLoading(false);
            }
        };

        fetchAlcool();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !degree) {
            setError('Name and degree are required');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const ingredientsArray = ingredients
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');

            await axios.put(`http://localhost:8081/alcools/update/${id}`, {
                name,
                degree,
                description,
                ingredients: ingredientsArray
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            navigate(`/alcools/${id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating alcool');
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Edit Alcool</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Degree *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ingredients (separated by commas)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(`/alcools/${id}`)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAlcool;