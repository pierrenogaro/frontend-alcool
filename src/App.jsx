import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Alcool from './pages/Alcool'

import { AuthProvider } from './context/AuthContext'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/alcool" element={<Alcool />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App;
