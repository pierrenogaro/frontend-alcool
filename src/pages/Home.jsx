import { useState, useEffect } from 'react';
import axios from 'axios';
import {LandingPage} from "./auth/Landing.jsx";

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/alcools/categories/all')
            .then(response => setCategories(response.data))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const color = (colorCat) => {
        const colors = [
            '#797e83',
            '#722F37',
            '#2ecc71',
            '#f39c12',
            '#9b59b6',
            '#1abc9c',
            '#34495e'
        ];
        return colors[colorCat];
    };

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col">
                    <div className="text-center">
                        <h1 className="display-4 mb-4">Alcools Collection</h1>
                        <p className="lead">Browse our collection of beverages.</p>
                        <a href="https://data-viz-alcool.pierrenogaro.com/"
                           className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-sm"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i className="bi bi-bar-chart-fill me-2"></i>
                            Explore Data-Viz
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mb-4">
                <h5>Categories:</h5>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {categories.map((category, colorCat) => (
                        <span
                            key={category}
                            className="badge"
                            style={{backgroundColor: color(colorCat),}}>{category}
                        </span>
                    ))}
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <h2 className="text-center mb-4">Our Collection</h2>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div className="mb-3 fs-1">
                                <i className="bi bi-collection"></i>
                            </div>
                            <h5 className="card-title">Selection</h5>
                            <p className="card-text">
                                Various alcoholic beverages from traditional to exotic options.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div className="mb-3 fs-1">
                                <i className="bi bi-list-check"></i>
                            </div>
                            <h5 className="card-title">Ingredients</h5>
                            <p className="card-text">
                                See what makes each beverage unique.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <div className="mb-3 fs-1">
                                <i className="bi bi-people"></i>
                            </div>
                            <h5 className="card-title">Community</h5>
                            <p className="card-text">
                                Collection from users sharing their favorite drinks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home