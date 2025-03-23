import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateAlcool from "./pages/alcools/CreateAlcool.jsx";
import { AuthProvider } from './context/AuthContext'
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Alcools from "./pages/alcools/Alcools.jsx";
import AlcoolDetail from "./pages/alcools/AlcoolDetail.jsx";
import EditAlcool from "./pages/alcools/EditAlcool.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/alcools" element={<Alcools />} />
                    <Route path="/alcools/:id" element={<AlcoolDetail />} />
                    <Route path="/alcools/edit/:id" element={<EditAlcool />} />
                    <Route path="/alcool/create" element={<CreateAlcool />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App;
