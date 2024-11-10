import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css';
import React from 'react';
import { useUser } from '../context/useUser';

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register',
});

export default function Authentication({ authenticationMode }) {
    const { user, setUser, signUp, signIn } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp();
                navigate('/signin');
            } else {
                await signIn();
                navigate('/');
            }
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data.error : error;
            alert(message);
        }
    };

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/signin');
    };

    return (
        <div className="auth-container">
            {user?.token ? (
                <div className="welcome-container">
                    <h3>Welcome, {user.email}</h3>
                    <button className="logout-button" onClick={handleLogOut}>Log Out</button>
                </div>
            ) : (
                <div className="auth-form-container">
                    <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign In' : 'Sign Up'}</h3>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                        </div>
                        <button className="submit-button">
                            {authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}
                        </button>
                        <Link className="auth-link" to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
}