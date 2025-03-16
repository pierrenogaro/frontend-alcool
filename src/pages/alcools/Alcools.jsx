import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../context/AuthContext.jsx";

const Alcool = () => {
    const [alcools, setAlcools] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, token } = useAuth();

    const fetchAlcools = () => {
        axios.get('http://localhost:8081/alcools/all')
            .then(response => {
                setAlcools(response.data);
                setLoading(false);
            })
            .catch(error => {
                alert.error("Error:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAlcools();
    }, []);

    const deleteAlcool = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/alcools/delete/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchAlcools();
        } catch (error) {
            alert.error("Error deleting:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h1>Alcools List</h1>
                {isLoggedIn && (
                    <Link to="/alcool/create" className="btn btn-primary">
                        Add Alcool
                    </Link>
                )}
            </div>

            <div className="row">
                {alcools.map((alcool) => (
                    <div className="col-md-4 mb-3" key={alcool._id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">{alcool.name}</h5>
                                    {isLoggedIn && alcool.author && (
                                        <button
                                            onClick={() => deleteAlcool(alcool._id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <span className="badge bg-warning text-dark">{alcool.degree}°</span>
                                {alcool.description && <p className="mt-2">{alcool.description}</p>}
                                {alcool.ingredients?.length > 0 && (
                                    <p className="text-muted small">
                                        Ingredients: {alcool.ingredients.join(', ')}
                                    </p>
                                )}
                                {alcool.author?.username && (
                                    <p className="text-end small text-muted">
                                        Added by: {alcool.author.username}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alcool;