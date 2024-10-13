import React, { useEffect, useContext, useReducer, useState } from 'react';
import { apiClient } from './apiClient';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userInfo: null };
        case 'SET_USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'LOGIN_AND_SET_USER_INFO':
            return { isLoggedIn: true, userInfo: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, userInfo: JSON.parse(localStorage.getItem('userInfo')) || null });
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    dispatch({ type: 'LOGOUT' });
                    setIsFetching(false);
                    return;
                }
                const response = await apiClient.get('/users/current-user');
                if (response.status === 200 && response.data.user) {
                    if (state.userInfo) {
                        dispatch({ type: 'LOGIN' });
                    } else {
                        const userData = response.data.user;
                        const fullName = userData.surname ? `${userData.name} ${userData.surname}` : userData.name;
                        const payload = { fullName, role: userData.role };
                        localStorage.setItem('userInfo', JSON.stringify(payload));
                        dispatch({ type: 'LOGIN_AND_SET_USER_INFO', payload });
                    }
                } else {
                    dispatch({ type: 'LOGOUT' });

                }
            } catch (error) {
                localStorage.removeItem('authToken');
                dispatch({ type: 'LOGOUT' });
            } finally {
                setIsFetching(false);
            }
        };

        fetchUser();
    }, []);

    const loginAuth = (userInfo) => {
        dispatch({ type: 'LOGIN_AND_SET_USER_INFO', payload: userInfo });
    };

    const logoutAuth = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: state.isLoggedIn, loginAuth, logoutAuth, userInfo: state.userInfo, isFetching }}>
            {children}
        </AuthContext.Provider>
    );
};
