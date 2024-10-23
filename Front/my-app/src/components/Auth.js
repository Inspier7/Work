import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3002/auth/login' : 'http://localhost:3002/auth/register';
        try {
            const response = await axios.post(url, { username, password });
            if (isLogin) {
                setSuccessMessage('Логин успешен'); // Сообщение о успешном входе
                setError(''); // Очищаем ошибку при успешном входе
            }
            fetchUsers(); // Получаем список пользователей после регистрации или входа
        } catch (error) {
            if (isLogin) {
                setError('Логин/Пароль не правильный'); // Сообщение об ошибке
            } else {
                setError('Ошибка: ' + (error.response ? error.response.data.message : error.message));
            }
            setSuccessMessage(''); // Очищаем сообщение об успехе при ошибке
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3002/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Загружаем пользователей при первом рендере
    }, []);

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Ошибка */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Успешное сообщение */}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </form>

            <h2>Registered Users:</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Auth;
