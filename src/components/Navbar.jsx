import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Alcool App</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/alcool">Alcools</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-warning">
                                        {user?.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link text-danger fs-5"
                                        onClick={logout}
                                        title="Logout"
                                    >
                                        <i className="bi bi-power"></i>
                                    </button>
                                </li>
                            </>) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
