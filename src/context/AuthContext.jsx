import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, [token]);

    const register = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8081/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            setToken(data.token);
            setUser({ username });
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoggedIn: !!token,
            login,
            register,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};