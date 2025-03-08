import { useState, useEffect } from 'react';
import axios from 'axios';

const Alcool = () => {
    const [alcools, setAlcools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8081/alcools/all')
            .then(response => {
                setAlcools(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Alcoholic Beverages</h1>

            <div className="row">
                {alcools.map((alcool) => (
                    <div className="col-md-4 mb-4" key={alcool._id}>
                        <div className="card h-100 border-0 rounded shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title">{alcool.name}</h5>
                                <span className="badge bg-warning text-dark mb-2">{alcool.degree}°</span>

                                {alcool.description && (
                                    <p className="card-text mt-3">{alcool.description}</p>
                                )}

                                {alcool.ingredients && alcool.ingredients.length > 0 && (
                                    <p className="card-text text-muted mt-2">
                                        <small>Ingredients: {alcool.ingredients.join(', ')}</small>
                                    </p>
                                )}

                                {alcool.author && alcool.author.username && (
                                    <p className="card-text text-end mt-3">
                                        <small className="text-muted">Added by: {alcool.author.username}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Alcool