import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authState = localStorage.getItem('akirapa_admin_auth');
        if (authState === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (username: string, password: string) => {
        const cleanUser = username.trim().toLowerCase();
        // Admin Credentials check
        if (
            (cleanUser === 'admin@akirapahomecareus.com' && password === 'admin123') ||
            (cleanUser === 'admin' && password === 'admin123') ||
            (cleanUser === 'suyeladmin1' && password === 'suyeladminstrator123#')
        ) {
            setIsAuthenticated(true);
            localStorage.setItem('akirapa_admin_auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('akirapa_admin_auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
