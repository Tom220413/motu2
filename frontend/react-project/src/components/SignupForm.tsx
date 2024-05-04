// SignupForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { signUp } = useAuth();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signUp(username, password, email);
            alert("Signup successful!");
        } catch (error: any) {
            alert(`Signup failed: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
