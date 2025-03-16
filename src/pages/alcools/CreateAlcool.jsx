import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../context/AuthContext.jsx";

const CreateAlcool = () => {
    const [name, setName] = useState('');
    const [degree, setDegree] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [error, setError] = useState('');

    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!name || !degree) {
                setError('Name and degree are required');
                return;
            }

            const ingredientsArray = ingredients
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');

            await axios.post('http://localhost:8081/alcools/create', {
                name,
                degree,
                description,
                ingredients: ingredientsArray
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            navigate('/alcool');
        } catch (err) {
            setError(err.response?.data?.error || 'Error during creation');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add a new Alcool</h2>
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
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/alcool')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAlcool;