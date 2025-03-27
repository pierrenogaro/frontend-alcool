import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../context/AuthContext.jsx";

const Alcools = () => {
    const [alcools, setAlcools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isLoggedIn, token } = useAuth();

    const fetchAlcools = () => {
        setLoading(true);
        axios.get('https://alcool-api.pierrenogaro.com/alcools/all')
            .then(response => {
                setAlcools(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching data: " + (error.response?.data?.error || error.message));
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAlcools();
    }, []);

    const deleteAlcool = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm('Are you sure you want to delete this alcool?')) {
            return;
        }

        try {
            await axios.delete(`https://alcool-api.pierrenogaro.com/alcools/delete/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchAlcools();
        } catch (error) {
            setError("Error deleting alcool: " + (error.response?.data?.error || error.message));
        }
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Alcools Collection</h1>
                {isLoggedIn && (
                    <Link to="/alcool/create" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>Add Alcool
                    </Link>
                )}
            </div>

            {alcools.length === 0 ? (
                <div className="alert alert-info">No alcools found in the collection</div>
            ) : (
                <div className="row g-4">
                    {alcools.map((alcool) => (
                        <div className="col-md-4 mb-4" key={alcool._id}>
                            <div className="card h-100 shadow-sm hover-card">
                                <Link
                                    to={`/alcools/${alcool._id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h5 className="card-title">{alcool.name}</h5>
                                            <span className="badge bg-warning text-dark">{alcool.degree}°</span>
                                        </div>

                                        {alcool.description && (
                                            <p className="card-text mt-2">
                                                {alcool.description.length > 100
                                                    ? `${alcool.description.substring(0, 100)}...`
                                                    : alcool.description
                                                }
                                            </p>
                                        )}

                                        {alcool.ingredients?.length > 0 && (
                                            <p className="text-muted small mt-2">
                                                <strong>Ingredients:</strong> {alcool.ingredients.join(', ')}
                                            </p>
                                        )}

                                        {alcool.author?.username && (
                                            <p className="text-end small text-muted mt-3 mb-0">
                                                Added by: {alcool.author.username}
                                            </p>
                                        )}
                                    </div>
                                </Link>

                                {isLoggedIn && alcool.author && alcool.author._id === useAuth().user?.id && (
                                    <div className="card-footer bg-transparent border-top-0">
                                        <div className="d-flex justify-content-end">
                                            <button
                                                onClick={(e) => deleteAlcool(alcool._id, e)}
                                                className="btn btn-sm btn-outline-danger"
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Alcools;