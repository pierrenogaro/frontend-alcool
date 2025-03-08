import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col">
                    <div className="text-center">
                        <h1 className="display-4 mb-4">Alcool Collection</h1>
                        <p className="lead">Browse our collection of beverages.</p>
                        <Link to="/alcool" className="btn btn-primary btn-lg mt-3">
                            View Collection
                        </Link>
                    </div>
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