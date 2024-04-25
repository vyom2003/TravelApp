import React, { useState } from 'react';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_no: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", user["email"]);
        formData.append("password", user["password"]);
        formData.append("name", user["name"]);
        formData.append("phone_no", user["phone_no"]);

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                window.location.href = '/';
                console.log('Response Data:', data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred');
        }
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
            <form style={{ background: '#ffffff', padding: '40px', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Register</h2>
                {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone_no"
                        value={user.phone_no}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#ffffff', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>Register</button>
            </form>
        </div>
    );
}

export default Register;
