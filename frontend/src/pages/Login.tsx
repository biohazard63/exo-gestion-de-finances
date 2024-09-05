import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            console.log("Login response:", response.data);

            // Ensure that the data contains the necessary properties
            if (response.data && response.data.token && response.data.id && response.data.role) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id.toString());
                localStorage.setItem('role', response.data.role);
                navigate('/'); // Navigate to the home page or dashboard after successful login
            } else {
                // If the response is successful but doesn't contain all necessary data
                setError('Login successful but missing some user data.');
            }
        } catch (err) {
            if (err.response) {
                // Check for different HTTP status codes and handle specific cases
                if (err.response.status === 422) {
                    setError('Invalid credentials');
                } else if (err.response.status === 401) {
                    setError('Unauthorized: Incorrect username or password');
                } else {
                    setError('An error occurred. Please try again later.');
                }
                console.error("Login error details:", err.response);
            } else {
                // Generic error handling if the error is not related to the HTTP response
                setError('An error occurred. Please try again later.');
                console.error("Login error:", err);
            }
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold">Login</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="m@example.com"
                                    value={credentials.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">Login</Button>
                        <Button variant="outline" className="w-full">Login with Google</Button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    <p className="mt-2 text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden lg:block relative w-full h-full">
                <img
                    src="/login.jpg"
                    alt="Login Visual"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}

export default LoginForm;