import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = Link
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assuming email and password are state variables that are correctly updated
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
    
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();  // Wait for the JSON response to fully parse
                console.log('Response Data:', data); // Log the entire response data
    
                // Check if the login message exactly matches 'Login successful'
                if (data.message === 'Login successful') {
                    console.log('Login Successful:', data.message);
                    localStorage.setItem("ID", data.id); // Assuming data.id exists and is correct
                    window.location.href = '/travel';  // Redirects to the '/travel' page
                } else {
                    alert(data.message);
                    console.log('Login Failed:', data.message);  // Log unsuccessful login attempt
                    // Additional UI feedback can go here
                }
            } else {
                const errorData = await response.json(); // Parse the error response
                console.error('Login Error:', errorData.message);
                // Handle UI error feedback here
            }
        } catch (error) {
            console.error('Network or other error:', error);
            // Handle UI error feedback for network issues here
        }
    };
    
    

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
                <form style={{ background: '#ffffff', padding: '40px', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }} onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
                    {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#ffffff', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>Login</button>
                    Not registered?  <Link to="/register">Register here</Link>
                </form>
            </div>
        </>
    );
}

export default Login;
