import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Alcool from './pages/Alcool'

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/alcool" element={<Alcool />} />
                </Routes>
            </div>
        </>
    )
}

export default App;
